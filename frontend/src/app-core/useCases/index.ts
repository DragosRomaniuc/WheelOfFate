import { employeeRepository } from './../repositories/employeeRepository'
import { generateSchedule } from './Employee';

const employeeUseCases = {
  generateSchedule: generateSchedule({
    employeeRepository: employeeRepository
  })
}

export {
  employeeUseCases
}