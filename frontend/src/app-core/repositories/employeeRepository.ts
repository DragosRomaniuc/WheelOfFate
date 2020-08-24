import { AxiosRequestConfig } from 'axios';
import { baseRequestService } from 'app-core/services/baseRequestService';
import { generateName } from 'app-core/utils';

export interface EmployeeRepository {
  readonly generateSchedule: () => Promise<any>
  readonly createRandomEmployee: () => Promise<any>
}

/**
 * Returns a schedule of available employees
 * @returns {Promise} Promise
 */
const generateSchedule = async (): Promise<any> => {

  const url = `http://localhost:9044/api/v1/employee/generateSchedule`;

  let config: AxiosRequestConfig = {
    method: "POST",
    data: {},
  };

  return baseRequestService(url, config);
};

const createRandomEmployee = async (): Promise<any> => {

  const url = `http://localhost:9044/api/v1/employee/createEmployee`;

  let name: any = generateName();
  name = name.split(" ");
  let email = name[0] + name[1] + "@gmail.com";

  let config: AxiosRequestConfig = {
    method: "POST",
    data: {
      firstName: name[0],
      lastName: name[1],
      email
    },
  };

  await baseRequestService(url, config);
  return {
    firstName: name[0],
    lastName: name[1],
    email
  }

};


const employeeRepository = {
  generateSchedule,
  createRandomEmployee
};

export {
  employeeRepository
} ;