import { GenerateScheduleController } from "./GenerateScheduleController";
import { GenerateScheduleUseCase } from "./GenerateScheduleUseCase";
import { employeeRepo, shiftRepo } from "../../repos";

const generateScheduleUseCase = new GenerateScheduleUseCase(employeeRepo, shiftRepo);

const generateScheduleController = new GenerateScheduleController(
  generateScheduleUseCase
)

export {
  generateScheduleUseCase,
  generateScheduleController
}