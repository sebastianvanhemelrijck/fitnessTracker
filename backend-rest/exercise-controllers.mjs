// Controller: defines routes and calls ONLY model functions (no mongoose here)

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  connect,
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise
} from './exercise-models.mjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;
const VALID_UNITS = ['kgs', 'lbs', 'miles'];

function isValidExercise(body) {
  if (!body || typeof body !== 'object') return false;
  const hasRequired = body.name !== undefined && body.reps !== undefined && body.weight !== undefined && body.unit !== undefined;
  if (!hasRequired) return false;

  const nameOk = typeof body.name === 'string' && body.name.trim().length > 0;
  const repsNumber = Number(body.reps);
  const weightNumber = Number(body.weight);
  const repsOk = Number.isInteger(repsNumber) && repsNumber > 0;
  const weightOk = Number.isInteger(weightNumber) && weightNumber >= 0;
  const unitOk = VALID_UNITS.includes(body.unit);

  let dateOk = true;
  if (body.date !== undefined) {
    dateOk = !Number.isNaN(Date.parse(body.date));
  }
  return nameOk && repsOk && weightOk && unitOk && dateOk;
}

function normalizeExercise(body) {
  return {
    name: body.name.trim(),
    reps: Number(body.reps),
    weight: Number(body.weight),
    unit: body.unit,
    date: body.date
  };
}

app.post(
  '/exercises',
  asyncHandler(async (req, res) => {
    if (!isValidExercise(req.body)) {
      return res.status(400).json({ Error: 'Invalid request' });
    }
    const created = await createExercise(normalizeExercise(req.body));
    res.status(201).json(created);
  })
);

app.get(
  '/exercises',
  asyncHandler(async (req, res) => {
    const exercises = await getExercises();
    res.status(200).json(exercises);
  })
);

app.get(
  '/exercises/:_id',
  asyncHandler(async (req, res) => {
    const exercise = await getExerciseById(req.params._id);
    if (!exercise) {
      return res.status(404).json({ Error: 'Not found' });
    }
    res.status(200).json(exercise);
  })
);

app.put(
  '/exercises/:_id',
  asyncHandler(async (req, res) => {
    if (!isValidExercise(req.body)) {
      return res.status(400).json({ Error: 'Invalid request' });
    }
    const updated = await updateExercise(req.params._id, normalizeExercise(req.body));
    if (!updated) {
      return res.status(404).json({ Error: 'Not found' });
    }
    res.status(200).json(updated);
  })
);

app.delete(
  '/exercises/:_id',
  asyncHandler(async (req, res) => {
    const ok = await deleteExercise(req.params._id);
    if (!ok) {
      return res.status(404).json({ Error: 'Not found' });
    }
    res.status(204).send();
  })
);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server listening on port ${PORT}...`);
});
