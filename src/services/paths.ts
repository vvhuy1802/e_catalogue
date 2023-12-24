import Config from '../config';
const baseUrl = Config.API_URL;

const Services = {
  user: '/users/',
  auth: '/auth/',
  product: '/product/',
  userInfo: '/user-info/',
};

export const apiUrl = {
  login: () => `${baseUrl}${Services.auth}login`,
  register: () => `${baseUrl}${Services.user}createuser`,
  refreshToken: () => `${baseUrl}${Services.auth}refresh`,
  me: () => `${baseUrl}${Services.auth}me`,
  getAllCategories: () => `${baseUrl}${Services.product}category/all`,
  getProductsByCategory: (categoryId: number) =>
    `${baseUrl}${Services.product}category/?id=${categoryId}`,
  profileImage: () => `${baseUrl}${Services.userInfo}profile-image`,
  getUserInfo: () => `${baseUrl}${Services.userInfo}`,
};
