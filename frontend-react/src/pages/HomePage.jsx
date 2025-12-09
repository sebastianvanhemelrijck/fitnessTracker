import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

const HomePage = ({ setExerciseToEdit }) => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const loadExercises = async () => {
    const response = await fetch('/exercises');
    if (response.ok) {
      const data = await response.json();
      setExercises(data);
    } else {
      alert('Failed to fetch exercises');
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
    if (response.status === 204) {
      setExercises(exercises.filter((exercise) => exercise._id !== id));
    } else {
      alert('Failed to delete exercise');
    }
  };

  const handleEdit = (exercise) => {
    setExerciseToEdit(exercise);
    navigate('/edit');
  };

  return (
    <section className="page">
      <h2>Exercises</h2>
      {exercises.length === 0 ? <p>No exercises yet. Add one to get started.</p> : null}
      <ExerciseTable exercises={exercises} onEdit={handleEdit} onDelete={handleDelete} />
      <p style={{ marginTop: '1rem' }}>
        <Link to="/create">Add a new exercise</Link>
      </p>
    </section>
  );
};

export default HomePage;
