import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tasks when component loads
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(res.data.tasks);
        setTasks(res.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-dark-lighter text-white p-6 rounded-md res.data.Tasks">
      <h2 className="text-xl font-bold  mb-4">Tasks</h2>
      <ul className="list-disc pl-6">
        {tasks.map((task) => (
          <li key={task._id} className="mb-2">
            <span className="font-bold">{task.title}</span>: {task.description} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
