// Model: owns Mongoose schema/model and all DB operations for exercises
// IMPORTANT: Do not import Express here

import mongoose from 'mongoose';
import 'dotenv/config';

let connected = false;

async function connect() {
  if (connected) return;
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    connected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
    throw Error(`Could not connect to MongoDB ${err.message}`);
  }
}

const ExerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, enum: ['kgs', 'lbs', 'miles'] },
    date: { type: Date, default: Date.now }
  },
  { collection: 'exercises' }
);

const Exercise = mongoose.model('Exercise', ExerciseSchema);

async function createExercise(doc) {
  const exercise = new Exercise(doc);
  return await exercise.save();
}

async function getExercises() {
  return await Exercise.find({});
}

async function getExerciseById(id) {
  return await Exercise.findById(id);
}

async function updateExercise(id, updates) {
  return await Exercise.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

async function deleteExercise(id) {
  const res = await Exercise.deleteOne({ _id: id });
  return res.deletedCount === 1;
}

export { connect, createExercise, getExercises, getExerciseById, updateExercise, deleteExercise };
