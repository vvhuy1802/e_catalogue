export type ProductCategoryResponse = {
  id: number;
  name: string;
  description: string;
  imgage: string;
  children: ProductCategoryResponse[];
};
