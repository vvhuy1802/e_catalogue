import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {
  ProductById,
  ProductCategoryResponse,
  ProductsByCategory,
} from '~/types/product';
import {StoreResponse} from '~/screens/mainScreen/category/components/productDetail/Seller';

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

  getProductById: (productId: number) => {
    return request<ProductById>(
      apiUrl.getProductById(productId),
      Methods.get,
      '',
    );
  },

  getStoreById: (storeId: number) => {
    return request<StoreResponse>(
      apiUrl.getStoreById(storeId),
      Methods.get,
      '',
    );
  },

  postVisitStore: (params: any) => {
    return request<StoreResponse>(
      apiUrl.postVisitStore(),
      Methods.post,
      params,
    );
  },

  createNewProduct: (params: {
    name: string;
    description: string;
    category: number;
    image: FormData;
  }) => {
    return request<StoreResponse>(
      apiUrl.createNewProduct(),
      Methods.post,
      params,
      true,
    );
  },
};
