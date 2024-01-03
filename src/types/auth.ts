import {Normalized} from '.';

export type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type Wards = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
};

export type NormalizedWards = Normalized<string, Wards>;

export type Districts = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: NormalizedWards;
};

export type NormalizedDistricts = Normalized<string, Districts>;

export type LocationVietNam = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
  districts: NormalizedDistricts;
};

export type NormalizedLocationVietNam = Normalized<string, LocationVietNam>;
