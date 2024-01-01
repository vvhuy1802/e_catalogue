import {createContext} from 'react';
import {StoreResponse} from '~/screens/mainScreen/category/components/productDetail/Seller';
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

export const ProductStackContext = createContext<{
  store: StoreResponse;
  setStore: (data: StoreResponse) => void;
}>({
  store: {} as StoreResponse,
  setStore: () => {},
});
