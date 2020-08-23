import axios, { AxiosRequestConfig } from 'axios';

const baseRequestService = async (
  endpoint: string,
  options: AxiosRequestConfig
) => {
    try {
      if (!endpoint || !options?.method) return;

      console.log('baseReq options', options)

      return axios(endpoint, options).then(
        response => response.data
      );
    } catch (err) {
      
      console.log('err', err)
      return Promise.resolve(err);
    }
 
};

export {
  baseRequestService
};
