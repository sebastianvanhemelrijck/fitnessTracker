import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditExercisePage = ({ exerciseToEdit }) => {
  const [name, setName] = useState(exerciseToEdit?.name ?? '');
  const [reps, setReps] = useState(exerciseToEdit?.reps ?? '');
  const [weight, setWeight] = useState(exerciseToEdit?.weight ?? '');
  const [unit, setUnit] = useState(exerciseToEdit?.unit ?? 'kgs');
  const [date, setDate] = useState(exerciseToEdit?.date?.split('T')[0] ?? '');
  const navigate = useNavigate();

  useEffect(() => {
    if (exerciseToEdit) {
      setName(exerciseToEdit.name);
      setReps(exerciseToEdit.reps);
      setWeight(exerciseToEdit.weight);
      setUnit(exerciseToEdit.unit);
      setDate(exerciseToEdit.date?.split('T')[0] ?? '');
    }
  }, [exerciseToEdit]);

  const updateExercise = async (event) => {
    event.preventDefault();
    if (!exerciseToEdit?._id) {
      navigate('/');
      return;
    }
    const updatedExercise = { name, reps: Number(reps), weight: Number(weight), unit, date };
    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExercise)
    });
    if (response.status === 200) {
      alert('Exercise updated!');
    } else {
      alert('Unable to update exercise.');
    }
    navigate('/');
  };

  if (!exerciseToEdit) {
    return (
      <section className="page">
        <p>No exercise selected for editing.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h2>Edit Exercise</h2>
      <form className="form-grid" onSubmit={updateExercise}>
        <p>
          <label>
            Name:{' '}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </p>
        <p>
          <label>
            Reps:{' '}
            <input
              type="number"
              min="1"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Weight:{' '}
            <input
              type="number"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Unit:{' '}
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="kgs">kgs</option>
              <option value="lbs">lbs</option>
              <option value="miles">miles</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Date:{' '}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
        </p>
        <p>
          <button type="submit">Update</button>
        </p>
      </form>
    </section>
  );
};

export default EditExercisePage;
