import { v4 } from 'uuid';

import mongoose from '../setup';

const shiftSchema = new mongoose.Schema({
  _id: String,
  history: {
    type: [Date],
  },
  lastShiftStart: {
    type: Date,
  },
  lastShiftEnd: {
    type: Date,
  },
  secondLastShiftStart: {
    type: Date,
  },
  secondLastShiftEnd: {
    type: Date,
  },
  totalShifts: {
    type: Number,
    default: 0
  },
  remainingShifts: {
    type: Number,
    default: 2
  }
});

shiftSchema.pre('save', async function preSaveShift(next: any) {
  
  console.log("Shift created");
  return next();
});


const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;
