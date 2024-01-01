import {createContext} from 'react';
import {NormalizedLocationVietNam} from '~/types/auth';
import {Contact, ContactAddress} from '~/types/contact';

export const OrderStackContext = createContext<{
  dataAddress: Contact;
  setDataAddress: (data: Contact) => void;
  localAddress: NormalizedLocationVietNam | null;
  dataContact: Contact[];
}>({
  dataAddress: {} as Contact,
  setDataAddress: () => {},
  localAddress: null,
  dataContact: [],
});
