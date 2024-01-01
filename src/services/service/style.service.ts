import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {StyleIdeaResponse} from '~/types/styleIdea';

type StyleResponse = {
  id: number;
  name: string;
  category: string;
  mainImage: string;
  width: number;
  height: number;
  store: {
    id: number;
    name: string;
    description: string;
    address: number;
    logo_image: string;
    cover_image: string;
    approved: boolean;
  };
  rectangles: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    variant: {
      id: number;
      size: string;
      color: string;
      image: string;
      price: number;
      quantity: number;
      product: {
        id: number;
        name: string;
        description: string;
        image: string;
        minPrice: number;
        maxPrice: number;
        store: {
          id: number;
          name: string;
          description: string;
          address: number;
          logo_image: string;
          cover_image: string;
          approved: boolean;
        };
      };
    };
  }[];
};

export const styleService = {
  createStyle: (params: any) => {
    return request<StyleResponse>(
      apiUrl.createStyle(),
      Methods.post,
      params,
      true,
    );
  },

  addListImage: (params: any) => {
    return request<any>(
      'https://e-catalogue.abcdavid.top/product/style/image',
      Methods.post,
      params,
      true,
    );
  },

  getAllStyleByStore: (storeId: number) => {
    return request<StyleIdeaResponse[]>(
      `https://e-catalogue.abcdavid.top/product/style/store?id=${storeId}`,
      Methods.get,
      null,
      true,
    );
  },

  getAllStyleByCategory: (categoryId: number) => {
    return request<StyleIdeaResponse[]>(
      `https://e-catalogue.abcdavid.top/product/style/category?id=${categoryId}`,
      Methods.get,
      null,
      true,
    );
  },
};
