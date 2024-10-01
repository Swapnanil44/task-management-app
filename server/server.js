const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db')
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users',userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
