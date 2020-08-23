import moment from 'moment';
import { Entity } from "../../../core/domain/Entity";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { ShiftId } from "./shiftId";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";

interface ShiftProps {
  history?: [moment.MomentInput]
  remainingShifts: number,
  totalShifts?: number,
  lastShiftStart?: moment.MomentInput
  lastShiftEnd?: moment.MomentInput
  secondLastShiftStart?: moment.MomentInput
  secondLastShiftEnd?: moment.MomentInput
}

export class Shift extends Entity<ShiftProps> {

  private constructor (props: ShiftProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id (): UniqueEntityID {
    return this._id;
  }

  get shiftId () : ShiftId {
    return ShiftId.create(this.id);
  }

  get lastShiftStart (): moment.MomentInput {
    return this.props.lastShiftStart;
  }

  get lastShiftEnd (): moment.MomentInput {
    return this.props.lastShiftEnd;
  }

  get secondLastShiftStart (): moment.MomentInput {
    return this.props.secondLastShiftStart;
  }

  get secondLastShiftEnd (): moment.MomentInput {
    return this.props.secondLastShiftEnd;
  }

  get totalShifts (): number {
    return this.props.totalShifts;
  }

  get remainingShifts (): number {
    return this.props.remainingShifts;
  }

  get history (): [moment.MomentInput] {
    return this.props.history;
  }

  // public removeShift (shift: Shift): void {
  //   this.props.shifts = this.props.shifts
  //     .filter((g) => !g.id.equals(shift.id));
  // }

  public static create (props: ShiftProps, id?: UniqueEntityID): Result<Shift> {
    const guardedProps = [
      { argument: id, argumentName: 'id' },
    ]

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Shift>(guardResult.message)
    }  else {
      return Result.ok<Shift>(new Shift({
        ...props
      }, id));
    }
  }
}