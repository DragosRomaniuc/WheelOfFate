import { Mapper } from "../../../core/infra/Mapper";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Employee } from "../domain/employee";
import { EmployeeId } from "../domain/employeeId";

export class EmployeeMap extends Mapper<Employee> {

  public static toPersistence (employee: Employee): any {
    return {
      _id: employee.id.toString(),
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName
    }
  }

  public static toDomain (raw: any): Employee {

    const shiftOrError = Employee.create({
      email: raw.email,
      firstName: raw.firstName,
      lastName: raw.lastName,
    }, new UniqueEntityID(raw.id))

    shiftOrError.isFailure ? console.log(shiftOrError.error) : '';
    
    return shiftOrError.isSuccess ? shiftOrError.getValue() : null;
  }
  
}