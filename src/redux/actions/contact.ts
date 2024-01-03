import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';
import {RegisterParams} from '~/types/auth';
import {contactService} from '~/services/service/contact.service';

export const getAllUserContact = createAsyncThunk(
  'contact/get all contact',
  async () => {
    const res = await contactService.getUserAddress();
    return {data: res};
  },
);
