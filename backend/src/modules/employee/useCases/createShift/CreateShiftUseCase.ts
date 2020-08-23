import { UseCase } from '../../../../core/domain/UseCase';
import { CreateShiftDTO } from './CreateShiftDTO';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { Employee } from '../../domain/employee'
import { GenericAppError } from '../../../../core/logic/AppError'
import { CreateShiftErrors } from './CreateShiftErrors'
import { IShiftRepo } from '../../repos/shiftRepo';
import { Shift } from '../../domain/shift';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { ShiftId } from '../../domain/shiftId';

type Response = Either<
  GenericAppError.UnexpectedError |
  CreateShiftErrors.ShiftAlreadyExists |
  Result<any>,
  Result<void>
>

export class CreateShiftUseCase implements UseCase<CreateShiftDTO, Promise<Response>> {
  private shiftRepo: IShiftRepo;

  constructor (shiftRepo: IShiftRepo) {
    this.shiftRepo = shiftRepo;
  }

  async execute (req: CreateShiftDTO): Promise<Response> {
    const { id } = req;
    const shiftId = ShiftId.create(id);
    const shiftOrError = Shift.create({
      remainingShifts: 2
    }, ShiftId.create(id));

    if (shiftOrError.isFailure) {
      return left(Result.fail<void>(shiftOrError.error)) as Response;
    }

    const shift: Shift = shiftOrError.getValue();

    const shiftAlreadyExists = await this.shiftRepo.exists(shift.shiftId);

    if (shiftAlreadyExists) {
      return left(new CreateShiftErrors.ShiftAlreadyExists(shift.shiftId)) as Response;
    }

    try {
      console.log('employee de aicisa---', employee)
      await this.employeeRepo.create(employee);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}