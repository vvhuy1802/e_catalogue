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

export type ContactAPIParams = {
  phone: string;
  province: string;
  district: string;
  ward: string;
  details: string;
};

export type ContactAPIReponse = {
  id: string;
  phone: string;
  fullname: string;
  user_id: string;
  address: {
    id: string;
    province: string;
    district: string;
    ward: string;
    details: string;
  };
};

export type addressTree = Array<{
  name: string;
  code: string;
  codename: string;
  division_type: string;
  phone_code: string;
  districts: Array<{
    name: string;
    code: string;
    codename: string;
    division_type: string;
    short_codename: string;
    wards: Array<wardType>;
  }>;
}>;

type wardType = {
  name: string;
  code: string;
  codename: string;
  division_type: string;
  short_codename: string;
};
