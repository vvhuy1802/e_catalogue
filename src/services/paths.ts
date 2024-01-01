import Config from '../config';
const baseUrl = Config.API_URL;

const Services = {
  user: '/users/',
  auth: '/auth/',
  product: '/product/',
  userInfo: '/user-info/',
  order: '/order/',
  contact: '/contact/',
};

export const apiUrl = {
  login: () => `${baseUrl}${Services.auth}login`,
  register: () => `${baseUrl}${Services.user}createuser`,
  refreshToken: () => `${baseUrl}${Services.auth}refresh`,
  me: () => `${baseUrl}${Services.auth}me`,

  getAllCategories: () => `${baseUrl}${Services.product}category/all`,
  getProductsByCategory: (categoryId: number) =>
    `${baseUrl}${Services.product}category/?id=${categoryId}`,
  getProductById: (productId: number) =>
    `${baseUrl}${Services.product}?id=${productId}`,

  addProductToCart: () => `${baseUrl}${Services.order}cart`,
  getCartUser: () => `${baseUrl}${Services.product}cart`,
  deleteItemCart: () => `${baseUrl}${Services.order}cart`,
  makeOrder: () => `${baseUrl}${Services.product}order`,
  getAllOrder: () => `${baseUrl}${Services.product}order/store`,
  updateOrderStatus: (orderId: number) => `${baseUrl}/order?id=${orderId}`,

  getAllUserAddress: () => `${baseUrl}${Services.contact}user`,

  profileImage: () => `${baseUrl}${Services.userInfo}profile-image`,
  getUserInfo: () => `${baseUrl}${Services.userInfo}`,
  setUserInfo: () => `${baseUrl}${Services.userInfo}`,
};
