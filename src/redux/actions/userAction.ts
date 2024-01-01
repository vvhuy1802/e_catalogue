import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';
import {RegisterParams} from '~/types/auth';
import {userService} from '~/services/service/user.service';

export const checkUsername = createAsyncThunk(
  'users/check username',
  async (params: {username: string}) => {
    const res = await userService.checkUsername(params);
    return {data: res};
  },
);

export const checkEmail = createAsyncThunk(
  'users/check email',
  async (params: {email: string}) => {
    const res = await userService.checkEmail(params);
    return {data: res};
  },
);
