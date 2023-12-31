export type ContactAddress = {
  id: number;
  province: string;
  district: string;
  ward: string;
  details: string;
};

export type Contact = {
  id: number;
  user_id: number;
  fullname?: string;
  phone: string;
  address: ContactAddress;
};
