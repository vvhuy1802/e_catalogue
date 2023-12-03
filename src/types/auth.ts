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
  access_token: string;
  refresh_token: string;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};
