const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Helper function to check if user is admin
const isAdmin = (user) => user.role === 'admin';

// @route   POST /tasks
// @desc    Create a new task
// @access  Private (Authenticated users)
router.post('/', protect, async (req, res) => {
  const { title, description, dueDate, priority, assignedUser } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedUser: assignedUser ? assignedUser : req.user._id, // Assign task to self if no assigned user
      createdBy: req.user._id, // The user who created the task
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   PUT /tasks/:id
// @desc    Update a task
// @access  Private (Only task creator or admin)
router.put('/:id', protect, async (req, res) => {
  const { title, description, dueDate, status, priority, assignedUser } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only allow task creator or admin to update
    if (task.createdBy.toString() !== req.user._id.toString() && !isAdmin(req.user)) {
      return res.status(401).json({ message: 'Not authorized to update this task' });
    }

    // Update task details
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignedUser = assignedUser || task.assignedUser;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   DELETE /tasks/:id
// @desc    Delete a task
// @access  Private (Only task creator or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only allow task creator or admin to delete
    if (task.createdBy.toString() !== req.user._id.toString() && !isAdmin(req.user)) {
      return res.status(401).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   GET /tasks
// @desc    Get all tasks (with pagination, search, and filtering)
// @access  Private (Authenticated users)
router.get('/', protect, async (req, res) => {
  const { page = 1, limit = 10, search, status, priority } = req.query;

  try {
    // Build query for filtering
    let query = { $or: [{ createdBy: req.user._id }, { assignedUser: req.user._id }] };

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search by title
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Paginate results
    const tasks = await Task.find(query)
      .populate('assignedUser', 'name email') // Populate assigned user details
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
