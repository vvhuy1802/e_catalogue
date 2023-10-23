import Config from '../config';
const service = 'core-api';
const baseUrl = Config.API_URL;

export const apiUrl = {
  login: () => `${baseUrl}${service}/login`,
};
