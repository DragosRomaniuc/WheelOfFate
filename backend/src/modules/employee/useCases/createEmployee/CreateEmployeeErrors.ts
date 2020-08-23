import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace CreateEmployeeErrors {

  export class EmployeeAlreadyExists extends Result<UseCaseError> {    
    constructor (name: string) {
      super(false, {
        message: `The employee ${name} already exists`
      } as UseCaseError)
    }
  }

  export class ShiftAlreadyExists extends Result<UseCaseError> {    
    constructor (id: string | number) {
      super(false, {
        message: `The employee ${id} already exists`
      } as UseCaseError)
    }
  }

}