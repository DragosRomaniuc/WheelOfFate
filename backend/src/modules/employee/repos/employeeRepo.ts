import { Employee } from '../domain/employee';
import { EmployeeMap } from '../mappers/EmployeeMap';

export interface IEmployeeRepo {
  findEmployeeByEmail(email: string): Promise<Employee>;
  findEmployeeById(id: string): Promise<Employee>;
  exists (email: string): Promise<boolean>;
  create(employee: Employee): Promise<void>;
}

export class EmployeeRepo implements IEmployeeRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  };

  public async findEmployeeByEmail(email: string): Promise<Employee> {
    return this.models.Employee.findOne({
      email
    });
  }

  public async findEmployeeById(id: string): Promise<Employee> {
    return this.models.Employee.findOne(id);
  }

  public async exists(email: string): Promise<boolean> {
    return !!await this.models.Employee.findOne({
      email
    });

  }

  public async create (employee: Employee): Promise<void> {
    const EmployeeModel = this.models.Employee;
    
    const rawEmployee = EmployeeMap.toPersistence(employee);
    const exists = await this.exists(rawEmployee.email);
    
    try {
      if (!exists) {
        console.log('[Employee Repo]: created: ', rawEmployee);
        let newEmployee = await new EmployeeModel(rawEmployee);
        await newEmployee.save();
      }
    } catch (err) {
      console.log(err);
    }
  }
}