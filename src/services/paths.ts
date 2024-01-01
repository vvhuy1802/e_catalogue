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
  createStyle: () => 'https://e-catalogue.abcdavid.top/product/style',
  getUserById: () => `${baseUrl}${Services.user}`,
  setNewUsername: () => `${baseUrl}${Services.user}username`,
  setNewEmail: () => `${baseUrl}${Services.user}email`,
  setNewPassword: () => `${baseUrl}${Services.user}password`,

  username_availability: () =>
    `${baseUrl}${Services.user}username_availability`,
  email_availability: () => `${baseUrl}${Services.user}email_availability`,

  getAllCategories: () => `${baseUrl}${Services.product}category/all`,
  getProductsByCategory: (categoryId: number) =>
    `${baseUrl}${Services.product}category/?id=${categoryId}`,
  getProductById: (productId: number) =>
    `${baseUrl}${Services.product}?id=${productId}`,
  followStore: () => `${baseUrl}${Services.userInfo}store/follow`,
  getStoreById: (storeId: number) => {
    return `${baseUrl}${Services.product}store?id=${storeId}`;
  },
  addProductToCart: () => `${baseUrl}${Services.order}cart`,
  getCartUser: () => `${baseUrl}${Services.product}cart`,
  deleteItemCart: () => `${baseUrl}${Services.order}cart`,
  makeOrder: () => `${baseUrl}${Services.product}order`,
  getAllOrder: () => `${baseUrl}${Services.product}order/store`,
  updateOrderStatus: (orderId: number) => `${baseUrl}/order?id=${orderId}`,

  getAllUserAddress: () => `${baseUrl}${Services.contact}user`,
  setFullContact: () => `${baseUrl}${Services.contact}full`,

  profileImage: () => `${baseUrl}${Services.userInfo}profile-image`,
  getUserInfo: () => `${baseUrl}${Services.userInfo}`,

  updateCategory: (categoryId: number) =>
    `${baseUrl}${Services.product}category?id=${categoryId}`,
  addNewCategory: () => `${baseUrl}${Services.product}category`,
  setUserInfo: () => `${baseUrl}${Services.userInfo}`,

  addFavorite: () => `${baseUrl}${Services.userInfo}favorite`,
  removeFavorite: () => `${baseUrl}${Services.userInfo}favorite`,
  createNewCollection: () => `${baseUrl}${Services.userInfo}collection`,
  updateCollection: () => `${baseUrl}${Services.userInfo}collection`,
  removeCollection: () => `${baseUrl}${Services.userInfo}collection`,
  getAllCollection: () => `${baseUrl}${Services.userInfo}collections`,

  createNewProduct: () => `${baseUrl}${Services.product}`,
};
