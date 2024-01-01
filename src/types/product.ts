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
  type?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
};

export type ProductsByCategory = {
  id: number;
  name: string;
  description: string;
  image: string;
  products: Product[];
};

export type StoreProduct = {
  id: number;
  name: string;
  description: string;
  address: number;
  logo_image: string;
  cover_image: string;
  approved: boolean;
};
export type Variant = {
  id: number;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
};
export type ProductById = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  variants: Array<Variant>;
  images: Array<{
    id: number;
    image: string;
  }>;
  store: StoreProduct;
  ratings: Array<{}>;
  minPrice: number;
  maxPrice: number;
};
