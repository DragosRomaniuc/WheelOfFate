import { CreateEmployeeController } from "./CreateEmployeeController";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";
import { employeeRepo, shiftRepo } from "../../repos";

const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepo, shiftRepo);
const createEmployeeController = new CreateEmployeeController(
  createEmployeeUseCase
)

export {
  createEmployeeUseCase,
  createEmployeeController
}