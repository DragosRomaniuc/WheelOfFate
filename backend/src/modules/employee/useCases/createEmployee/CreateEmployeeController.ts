import { BaseController } from "../../../../core/infra/BaseController";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";
import { CreateEmployeeDTO } from "./CreateEmployeeDTO";
import { CreateEmployeeErrors } from "./CreateEmployeeErrors";

export class CreateEmployeeController extends BaseController {
  private useCase: CreateEmployeeUseCase;

  constructor (useCase: CreateEmployeeUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: CreateEmployeeDTO = this.req.body as CreateEmployeeDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreateEmployeeErrors.EmployeeAlreadyExists:
            return this.conflict(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}

