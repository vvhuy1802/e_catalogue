import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {ProductCategoryResponse, ProductsByCategory} from '~/types/product';

export const productService = {
  getAllCategories: () => {
    return request<ProductCategoryResponse[]>(
      apiUrl.getAllCategories(),
      Methods.get,
      '',
    );
  },

  getProductsByCategory: (categoryId: number) => {
    return request<ProductsByCategory>(
      apiUrl.getProductsByCategory(categoryId),
      Methods.get,
      '',
    );
  },
};