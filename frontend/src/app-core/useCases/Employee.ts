export const generateSchedule = (deps: any) => 
  async () : Promise<any> => {
    try {
      const { employeeRepository } = deps;

      const result = await employeeRepository.generateSchedule();

      return Promise.resolve(result);

    } catch (err) {

      return Promise.reject(err);
    }
  };




  