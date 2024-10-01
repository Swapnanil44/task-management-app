import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import Tasks from './pages/Tasks';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-light dark:bg-dark text-light-text dark:text-dark-text transition-all">
        <Router>
          <nav className="p-4 flex justify-between items-center bg-dark-lighter text-dark-text">
            <h1 className="text-xl font-bold">Task Management</h1>
            <button
              className="p-2 bg-dark-accent text-white rounded-md"
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle Dark Mode
            </button>
          </nav>

          <main className="p-6">
            <Routes>
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </main>
        </Router>
      </div>
    </div>
  );
}

export default App;
