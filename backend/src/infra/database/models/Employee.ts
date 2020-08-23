import { v4 } from 'uuid';

import mongoose from '../setup';

const employeeSchema = new mongoose.Schema({
  _id: String,
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    lowercase: true,
    type: String,
    required: true,
  }
});

employeeSchema.pre('save', async function preSaveEmployee(next: any) {
  
  console.log("Employee created");
  return next();
});


const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
