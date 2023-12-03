import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {LoginResponse, RegisterParams, RegisterResponse} from '~/types/auth';

export const authService = {
  login: (params: any) => {
    return request<LoginResponse>(apiUrl.login(), Methods.post, params);
  },
  register: (params: RegisterParams) => {
    return request<RegisterResponse>(apiUrl.register(), Methods.post, params);
  },
};
