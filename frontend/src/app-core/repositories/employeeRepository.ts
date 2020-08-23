import { AxiosRequestConfig } from 'axios';
import { baseRequestService } from 'app-core/services/baseRequestService';

export interface EmployeeRepository {
  readonly generateSchedule: () => Promise<any>
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


const employeeRepository = {
  generateSchedule,
};

export {
  employeeRepository
} ;