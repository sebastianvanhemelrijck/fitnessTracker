import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExercisePage = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kgs');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const addExercise = async (event) => {
    event.preventDefault();
    const newExercise = {
      name,
      reps: Number(reps),
      weight: Number(weight),
      unit,
      date
    };
    const response = await fetch('/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExercise)
    });
    if (response.status === 201) {
      alert('Exercise saved!');
    } else {
      alert('Unable to save exercise.');
    }
    navigate('/');
  };

  return (
    <section className="page">
      <h2>Create Exercise</h2>
      <form className="form-grid" onSubmit={addExercise}>
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
          <button type="submit">Save</button>
        </p>
      </form>
    </section>
  );
};

export default AddExercisePage;
