import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';
import {RegisterParams} from '~/types/auth';
import {categoryService} from '~/services/service/category.service';
import {CategoryRequest} from '~/types/category';
import {styleService} from '~/services/service/style.service';

export const updateCategory = createAsyncThunk(
  'updateCategory/updateCategory Action',
  async (params: {categoryId: number; data: any}) => {
    let formData = new FormData();
    if (params.data.image) {
      formData.append('image', {
        uri: params.data.image.assets[0].uri,
        type: params.data.image.assets[0].type,
        name: params.data.image.assets[0].fileName,
      });
    }
    formData.append('name', params.data.name);
    formData.append('description', params.data.description);
    if (params.data.parent) {
      formData.append('parent', params.data.parent);
    }
    console.log(
      'Data upload image params: ',
      JSON.stringify(formData, null, 2),
    );
    const res = await categoryService.updateCategory(
      formData,
      params.categoryId,
    );
    return {data: res};
  },
);

export const addNewCategory = createAsyncThunk(
  'addNewCategory/addNewCategory Action',
  async (formData: any) => {
    const res = await categoryService.addNewCategory(formData);
    return {data: res};
  },
);

export const getStyleByStore = createAsyncThunk(
  'getStyleByStore/getStyleByStore Action',
  async (storeId: number) => {
    const res = await styleService.getAllStyleByStore(storeId);
    return {data: res};
  },
);

export const getStyleByCategory = createAsyncThunk(
  'getStyleByCategory/getStyleByCategory Action',
  async (categoryId: string) => {
    const res = await styleService.getAllStyleByCategory(categoryId);
    return {data: res};
  },
);
