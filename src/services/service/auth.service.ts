import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {LoginResponse, RegisterParams, RegisterResponse} from '~/types/auth';
import {DataReponseError} from '~/types/response';

export const authService = {
  login: (params: any) => {
    return request<LoginResponse & DataReponseError>(
      apiUrl.login(),
      Methods.post,
      params,
    );
  },
  register: (params: RegisterParams) => {
    return request<RegisterResponse>(apiUrl.register(), Methods.post, params);
  },
  me: () => {
    return request<RegisterResponse>(apiUrl.me(), Methods.get, '');
  },
  getUserById: (params: {id: string}) => {
    return request<RegisterResponse>(apiUrl.getUserById(), Methods.get, params);
  },
  setNewUsername: (params: {username: string}) => {
    return request<RegisterResponse>(
      apiUrl.setNewUsername(),
      Methods.put,
      params,
    );
  },
  setNewEmail: (params: {email: string}) => {
    return request<RegisterResponse>(apiUrl.setNewEmail(), Methods.put, params);
  },
  setNewPassword: (params: {oldPassword: string; newPassword: string}) => {
    return request<RegisterResponse>(
      apiUrl.setNewPassword(),
      Methods.put,
      params,
    );
  },
};
