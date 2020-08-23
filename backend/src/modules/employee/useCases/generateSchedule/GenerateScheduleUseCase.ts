import moment from 'moment';
import { UseCase } from '../../../../core/domain/UseCase';
import { GenerateScheduleDTO } from './GenerateScheduleDTO';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { Employee } from '../../domain/employee'
import { GenericAppError } from '../../../../core/logic/AppError'
import { GenerateScheduleErrors } from './GenerateScheduleErrors'
import { IEmployeeRepo } from '../../repos/employeeRepo';
import { IShiftRepo } from '../../repos/shiftRepo';
import { CreateShiftErrors } from '../createShift/CreateShiftErrors';
import { Shift } from '../../domain/shift';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { ShiftId } from '../../domain/shiftId';


type Response = Either<
  GenericAppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class GenerateScheduleUseCase implements UseCase<GenerateScheduleDTO, Promise<Response>> {
  private employeeRepo: IEmployeeRepo;
  private shiftRepo: IShiftRepo;

  constructor (
    employeeRepo: IEmployeeRepo,
    shiftRepo: IShiftRepo
    ) {
    this.employeeRepo = employeeRepo;
    this.shiftRepo = shiftRepo;
  }

  // private async getShiftsByRemainingShifts () {
  //   try {
  //     let shifts = this.shiftRepo.
  //   } catch (err) {
  //     console.log(err);
  //     Promise.reject(err);
  //   }
  // }

  private getShiftsByLastShiftStartAsc = async () : Promise<Result<Shift[]>> => {
    try {
      let shifts = await this.shiftRepo.getShiftsByLastShiftAscSecondLastShiftDesc();

      return Result.ok<Shift[]>(shifts);
    } catch (err) {
      return Result.fail<Shift[]>('Could not get shifts by lastshiftstart in ascending order');
    }
  }

  private filterConsecutiveDayRule = async (shifts: Shift[]): Promise<Result<Shift[]>> => {
     try {
       const filtered = shifts.filter((shift: Shift) => {
          let now = moment().utc();
          let lastShiftStart = moment(shift.lastShiftStart);
          let duration = moment.duration(now.diff(lastShiftStart));
    
          let hours = duration.asHours();
          
          return hours >= 24
        });
        
        return Result.ok<Shift[]>(filtered);
        
     } catch (err) {
      return Result.fail<Shift[]>('Could not get filter by consecutive day rule');
     }

  }

  private chooseEmployees = async (shifts: Shift[]): Promise<Result<Shift[]>> => {
   try {
    let chosen = shifts.splice(0,2);

   chosen.map(async (shift: any) => {
      let shiftId = ShiftId.create(new UniqueEntityID(shift._id));
      
      let updateObject = {
        lastShiftStart: moment.utc(),
        lastShiftEnd: moment.utc().add(12,'hours'),
        secondLastShiftStart: shift.lastShiftStart,
        secondLastShiftEnd: shift.lastShiftEnd,
        remainingShifts: shift.remainingShifts === 2 ? 1 : shift.remainingShifts === 1 ? 0 : 2
      };

      await this.shiftRepo.findByIdAndUpdate(shiftId, updateObject)
    })
    // console.log('chosen', chosen);

    return Promise.resolve(Result.ok<Shift[]>(chosen));
   } catch (err) {
    return Result.fail<Shift[]>(err);
   }
  }

  async execute (req: GenerateScheduleDTO): Promise<Response> {


    // const employeeOrError = Employee.create({ 
    //   email, 
    //   firstName, 
    //   lastName,
    // });

    // if (employeeOrError.isFailure) {
    //   return left(Result.fail<void>(employeeOrError.error)) as Response;
    // }

    // const employee: Employee = employeeOrError.getValue();

    // const employeeAlreadyExists = await this.employeeRepo.exists(employee.email);

    // if (employeeAlreadyExists) {
    //   return left(new GenerateScheduleErrors.EmployeeAlreadyExists(employee.email)) as Response;
    // }

    try {
      
      let shiftsOrError = await this.getShiftsByLastShiftStartAsc();

      if (shiftsOrError.isFailure) {
        return left(Result.fail<any>(shiftsOrError)) as Response;
      }

      let shifts = shiftsOrError.getValue();
      console.log(shifts);
      let filteredByConsecutiveDayRule = await this.filterConsecutiveDayRule(shifts);

      shifts = filteredByConsecutiveDayRule.getValue();

      let choosen = await this.chooseEmployees(shifts);

      return right(Result.ok<any>(shifts)) as Response;
      // await this.shiftRepo.create(shift);

    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    // return right(Result.ok(shifts)) as Response;
  }
}