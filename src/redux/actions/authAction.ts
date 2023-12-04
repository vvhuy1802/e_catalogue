import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';
import {RegisterParams} from '~/types/auth';

export const register = createAsyncThunk(
  'register/register Action',
  async (params: RegisterParams) => {
    const res = await authService.register(params);

    /**
     * * Can transform data here
     */
    return {data: res};
  },
);
