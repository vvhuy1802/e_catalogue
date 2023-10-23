import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';

export const login = createAsyncThunk(
  'login/login Action',
  async (params: any) => {
    const res = await authService.login (params);

    /**
     * * Can transform data here
     */
    return {data: res};
  },
);
