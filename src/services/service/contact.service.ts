import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {Contact, ContactAPIParams} from '~/types/contact';

export const contactService = {
  getUserAddress: () => {
    return request<Array<Contact>>(apiUrl.getAllUserAddress(), Methods.get, '');
  },
  setFullContact: (params: ContactAPIParams) => {
    return request(apiUrl.setFullContact(), Methods.post, params);
  },
};
