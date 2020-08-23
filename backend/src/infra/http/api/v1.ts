import express from 'express'
import { employeeRouter } from '../../../modules/employee/infra/http/routes';

const v1Router = express.Router();

v1Router.use('/employee', employeeRouter);

export { v1Router }