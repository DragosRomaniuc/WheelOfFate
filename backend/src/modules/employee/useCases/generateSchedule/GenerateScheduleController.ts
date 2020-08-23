import { BaseController } from "../../../../core/infra/BaseController";
import { GenerateScheduleUseCase } from "./GenerateScheduleUseCase";
import { GenerateScheduleDTO } from "./GenerateScheduleDTO";
import { GenerateScheduleErrors } from "./GenerateScheduleErrors";

export class GenerateScheduleController extends BaseController {
  private useCase: GenerateScheduleUseCase;

  constructor (useCase: GenerateScheduleUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: GenerateScheduleDTO = this.req.body as GenerateScheduleDTO;

    try {
      let result = await this.useCase.execute(dto);
      

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        result = result!.value.getValue();
        return this.res.json({result});
        // return this.ok(this.res);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}

