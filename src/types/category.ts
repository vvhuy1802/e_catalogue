import {ImagePickerResponse} from 'react-native-image-picker';

export type RootCategory = {
  id: number;
  name: string;
  description: string;
  image: string;
  children: RootCategory[];
};

export type CategoryRequest = {
  name: string;
  description: string;
  parent: number | null;
  image: ImagePickerResponse;
};

export type CategoryResponse = {};
