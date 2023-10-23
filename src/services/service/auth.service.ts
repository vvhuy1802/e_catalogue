import {apiUrl} from '../paths';
import {request} from '../axiosClient';

export const authService = {
  login : (params: any) => {
    return request(apiUrl.login(), 'post', params);
  },
};
