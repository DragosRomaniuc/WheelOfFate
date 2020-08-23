import { Entity } from "../../../core/domain/Entity";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { EmployeeId } from "./employeeId";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";

interface EmployeeProps {
  firstName: string;
  lastName: string;
  email: string;
}

export class Employee extends Entity<EmployeeProps> {
  public static MAX_NUMBER_GENRES_PER_ARTIST = 5;

  private constructor (props: EmployeeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id (): UniqueEntityID {
    return this._id;
  }

  get employeeId () : EmployeeId {
    return EmployeeId.create(this.id);
  }

  get firstName (): string {
    return this.props.firstName;
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get email (): string {
    return this.props.email;
  }

  // public removeShift (shift: Shift): void {
  //   this.props.shifts = this.props.shifts
  //     .filter((g) => !g.id.equals(shift.id));
  // }

  public static create (props: EmployeeProps, id?: UniqueEntityID): Result<Employee> {
    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
    ]

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Employee>(guardResult.message)
    }  else {
      return Result.ok<Employee>(new Employee({
        ...props
      }, id));
    }
  }
}