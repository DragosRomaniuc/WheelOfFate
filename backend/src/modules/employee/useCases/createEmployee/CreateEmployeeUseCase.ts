import { UseCase } from '../../../../core/domain/UseCase';
import { CreateEmployeeDTO } from './CreateEmployeeDTO';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { Employee } from '../../domain/employee'
import { GenericAppError } from '../../../../core/logic/AppError'
import { CreateEmployeeErrors } from './CreateEmployeeErrors'
import { IEmployeeRepo } from '../../repos/employeeRepo';
import { IShiftRepo } from '../../repos/shiftRepo';
import { CreateShiftErrors } from '../createShift/CreateShiftErrors';
import { Shift } from '../../domain/shift';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { ShiftId } from '../../domain/shiftId';
import moment from 'moment';

type Response = Either<
  GenericAppError.UnexpectedError |
  CreateEmployeeErrors.EmployeeAlreadyExists |
  Result<any>,
  Result<void>
>

export class CreateEmployeeUseCase implements UseCase<CreateEmployeeDTO, Promise<Response>> {
  private employeeRepo: IEmployeeRepo;
  private shiftRepo: IShiftRepo;

  constructor (
    employeeRepo: IEmployeeRepo,
    shiftRepo: IShiftRepo
    ) {
    this.employeeRepo = employeeRepo;
    this.shiftRepo = shiftRepo;
  }

  async execute (req: CreateEmployeeDTO): Promise<Response> {
    const { firstName, lastName, email } = req;

    const employeeOrError = Employee.create({ 
      email, 
      firstName, 
      lastName,
    });

    if (employeeOrError.isFailure) {
      return left(Result.fail<void>(employeeOrError.error)) as Response;
    }

    const employee: Employee = employeeOrError.getValue();

    const employeeAlreadyExists = await this.employeeRepo.exists(employee.email);

    if (employeeAlreadyExists) {
      return left(new CreateEmployeeErrors.EmployeeAlreadyExists(employee.email)) as Response;
    }

    try {
      
      await this.employeeRepo.create(employee);

      const shiftOrError = Shift.create({
        remainingShifts: 2,
        lastShiftStart: moment.utc('1970-01-01').format(),
        lastShiftEnd: moment.utc('1970-01-01').add(12, 'hours').format(),
        secondLastShiftStart: moment.utc('1970-01-03').format(),
        secondLastShiftEnd: moment.utc('1970-01-03').add(12, 'hours').format()
      }, employee.id)
      
      const shift = shiftOrError.getValue();
      console.log(employee , shift);
      await this.shiftRepo.create(shift);

    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}