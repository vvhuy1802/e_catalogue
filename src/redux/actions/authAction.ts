import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';
import {RegisterParams} from '~/types/auth';

export const register = createAsyncThunk(
  'register/register Action',
  async (params: RegisterParams) => {
    const res = await authService.register(params);
    return {data: res};
  },
);

export const getUserById = createAsyncThunk(
  'user/get user by id',
  async (params: {id: string}) => {
    const res = await authService.getUserById(params);
    return {data: res};
  },
);

export const setNewUsername = createAsyncThunk(
  'user/set new username',
  async (params: {username: string}) => {
    const res = await authService.setNewUsername(params);
    return {data: res};
  },
);

export const setNewEmail = createAsyncThunk(
  'user/set new email',
  async (params: {email: string}) => {
    const res = await authService.setNewEmail(params);
    return {data: res};
  },
);

export const setNewPassword = createAsyncThunk(
  'user/set new password',
  async (params: {oldPassword: string; newPassword: string}) => {
    const res = await authService.setNewPassword(params);
    return {data: res};
  },
);
