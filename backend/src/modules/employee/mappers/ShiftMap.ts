import { Mapper } from "../../../core/infra/Mapper";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Shift } from "../domain/shift";
import { EmployeeId } from "../domain/employeeId";

export class ShiftMap extends Mapper<Shift> {

  public static toPersistence (shift: Shift): any {
    return {
      _id: shift.id.toString(),
      lastShiftStart: shift.lastShiftStart,
      lastShiftEnd: shift.lastShiftEnd,
      secondLastShiftStart: shift.secondLastShiftStart,
      secondLastShiftEnd: shift.secondLastShiftEnd,
      remainingShifts: shift.remainingShifts,
      history: shift.history,
      totalShifts: shift.totalShifts
    }
  }

  public static toDomain (raw: any): Shift {

    const shiftOrError = Shift.create({
      lastShiftStart: raw.lastShiftStart,
      lastShiftEnd: raw.lastShiftEnd,
      secondLastShiftStart: raw.secondLastShiftStart,
      secondLastShiftEnd: raw.secondLastShiftEnd,
      remainingShifts: raw.remainingShifts,
      history: raw.history,
      totalShifts: raw.totalShifts
    }, new UniqueEntityID(raw._id))

    shiftOrError.isFailure ? console.log(shiftOrError.error) : '';
    
    return shiftOrError.isSuccess ? shiftOrError.getValue() : null;
  }
  
}
