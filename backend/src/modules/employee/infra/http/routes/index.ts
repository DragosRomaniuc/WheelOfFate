import express from 'express';
import { createEmployeeController } from '../../../useCases/createEmployee';
import { generateScheduleController } from '../../../useCases/generateSchedule';

const employeeRouter = express.Router();

employeeRouter.post('/createEmployee',
  (req, res) => createEmployeeController.execute(req, res)
);

employeeRouter.post('/generateSchedule',
  (req, res) => generateScheduleController.execute(req, res)
);

export { employeeRouter };