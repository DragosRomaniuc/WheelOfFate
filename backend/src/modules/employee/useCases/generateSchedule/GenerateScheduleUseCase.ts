import moment from 'moment';
import { UseCase } from '../../../../core/domain/UseCase';
import { GenerateScheduleDTO } from './GenerateScheduleDTO';
import { Either, Result, left, right } from '../../../../core/logic/Result';
import { Employee } from '../../domain/employee'
import { GenericAppError } from '../../../../core/logic/AppError'
import { GenerateScheduleErrors } from './GenerateScheduleErrors'
import { IEmployeeRepo } from '../../repos/employeeRepo';
import { IShiftRepo } from '../../repos/shiftRepo';
import { Shift } from '../../domain/shift';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { ShiftId } from '../../domain/shiftId';
import _ from 'lodash';


type Response = Either<
  GenericAppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class GenerateScheduleUseCase implements UseCase<GenerateScheduleDTO, Promise<Response>> {
  private employeeRepo: IEmployeeRepo;
  private shiftRepo: IShiftRepo;

  constructor(
    employeeRepo: IEmployeeRepo,
    shiftRepo: IShiftRepo
  ) {
    this.employeeRepo = employeeRepo;
    this.shiftRepo = shiftRepo;
  }

  private getShiftsBySecondLastShiftAscAndConsecutiveDayRule = async (): Promise<Result<Shift[]>> => {
    try {
      let shifts = await this.shiftRepo.getShiftsBySecondLastShiftAscAndConsecutiveDayRule();

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
      let chosen: any = shifts.splice(0, 2);
    
      let toReturn: any = await Promise.all(chosen.map(async (shift: any, index) => {
        let shiftId = ShiftId.create(new UniqueEntityID(shift._id));

        let updateObject = {
          totalShifts: shift.totalShifts + 1,
          lastShiftStart: index === 1 ? moment.utc() : moment.utc().add(12, 'hours'),
          lastShiftEnd: index === 1 ? moment.utc().add(12, 'hours') : moment.utc().add(24, 'hours'),
          secondLastShiftStart: shift.lastShiftStart,
          secondLastShiftEnd: shift.lastShiftEnd,
          remainingShifts: shift.remainingShifts === 2 ? 1 : shift.remainingShifts === 1 ? 0 : 2
        }

        // await this.shiftRepo.findByIdAndUpdate(shiftId, updateObject);

        return {
          _id: shift._id,
          totalShifts: shift.totalShifts + 1,
          lastShiftStart: index === 1 ? moment.utc() : moment.utc().add(12, 'hours'),
          lastShiftEnd: index === 1 ? moment.utc().add(12, 'hours') : moment.utc().add(24, 'hours'),
          secondLastShiftStart: moment(shift.lastShiftStart).utc(),
          secondLastShiftEnd: moment(shift.lastShiftEnd).utc(),
          remainingShifts: shift.remainingShifts === 2 ? 1 : shift.remainingShifts === 1 ? 0 : 2
        };
        
      }));
      
      return Result.ok<any>(toReturn);
    } catch (err) {
      return Result.fail<Shift[]>(err);
    }
  }

  async execute(req: GenerateScheduleDTO): Promise<Response> {
    try {
      let shiftsOrError = await this.getShiftsBySecondLastShiftAscAndConsecutiveDayRule();

      if (shiftsOrError.isFailure) {
        return left(Result.fail<any>(shiftsOrError)) as Response;
      }

      let shifts = shiftsOrError.getValue();
      console.log(shifts);
      // let filteredByConsecutiveDayRule = await this.filterConsecutiveDayRule(shifts);

      // shifts = filteredByConsecutiveDayRule.getValue();

      let chosen = await this.chooseEmployees(shifts);
      let result = chosen.getValue();
      let ids = result.map((shift: any) => shift._id);

      let toReturn = await this.employeeRepo.findEmployeeByIds(ids);

      let mappedResult = result.map((a:any) => {
        let found: any = toReturn.find((b: any) => b._id === a._id);
        return {
          ...a,
         ...found
        }
      })

      return right(Result.ok<any>(mappedResult)) as Response;
      // await this.shiftRepo.create(shift);

    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }
  }
}