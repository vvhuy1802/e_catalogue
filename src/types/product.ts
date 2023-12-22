export type ProductCategoryResponse = {
  id: number;
  name: string;
  description: string;
  image: string;
  children: ProductCategoryResponse[];
};

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type ProductsByCategory = {
  id: number;
  name: string;
  description: string;
  image: string;
  products: Product[];
};
