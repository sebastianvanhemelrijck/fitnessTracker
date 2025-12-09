import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const year = new Date().getFullYear();

  return (
    <div className="app">
      <Router>
        <header>
          <h1>Exercise Tracker</h1>
          <p>Log reps, weight, and distance in one place.</p>
        </header>
          <nav>
            <Link to="/create">Create</Link>
            <Link to="/">Retrieve</Link>
          </nav>
        <main>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
            <Route path="/create" element={<AddExercisePage />} />
            <Route path="/edit" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
          </Routes>
        </main>
      </Router>
      <footer>
        <p> {year} - Sebastian van Hemelrijck</p>
      </footer>
    </div>
  );
}

export default App;
