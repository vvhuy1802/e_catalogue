import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {Contact} from '~/types/contact';
import {CategoryRequest} from '~/types/category';

export const categoryService = {
  updateCategory: (params: any, categoryId: number) => {
    return request<any>(
      apiUrl.updateCategory(categoryId),
      Methods.put,
      params,
      true,
    );
  },
  addNewCategory: (params: any) => {
    return request<any>(apiUrl.addNewCategory(), Methods.post, params, true);
  },
};
