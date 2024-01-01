import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {Contact} from '~/types/contact';

export const contactService = {
  getUserAddress: () => {
    return request<Array<Contact>>(apiUrl.getAllUserAddress(), Methods.get, '');
  },
};
