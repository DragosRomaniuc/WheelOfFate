import { CreateShiftUseCase } from "./CreateShiftUseCase";
import { shiftRepo } from "../../repos";

const createShiftUseCase = new CreateShiftUseCase(shiftRepo);

export {
  createShiftUseCase,
}