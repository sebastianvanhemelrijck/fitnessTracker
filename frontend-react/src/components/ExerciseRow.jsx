import { FaEdit, FaTrash } from 'react-icons/fa';

const ExerciseRow = ({ exercise, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date?.split('T')[0]}</td>
      <td className="actions">
        <button type="button" onClick={() => onEdit(exercise)} aria-label="Edit exercise">
          <FaEdit />
        </button>
        <button type="button" onClick={() => onDelete(exercise._id)} aria-label="Delete exercise">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ExerciseRow;
