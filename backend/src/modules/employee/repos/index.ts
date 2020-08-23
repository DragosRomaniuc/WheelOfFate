import { EmployeeRepo } from "./employeeRepo";
import { ShiftRepo } from './shiftRepo';

import { Employee, Shift} from '../../../infra/database';

const employeeRepo = new EmployeeRepo({
  Employee
});

const shiftRepo = new ShiftRepo({
  Shift
})

export {
  employeeRepo,
  shiftRepo
};