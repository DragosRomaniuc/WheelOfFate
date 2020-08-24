import { employeeRepository } from './../repositories/employeeRepository'
import { generateSchedule, createRandomEmployee } from './Employee';

const employeeUseCases = {
  generateSchedule: generateSchedule({
    employeeRepository: employeeRepository
  }),
  createRandomEmployee: createRandomEmployee({
    employeeRepository: employeeRepository
  })
}

export {
  employeeUseCases
}