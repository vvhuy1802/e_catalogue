export type AddProductToCartParams = {
  product_variant: number;
  quantity: number;
};

export type CartItem = {
  id: number;
  product_variant: number;
  quantity: number;
};

export type CartUser = {
  id: number;
  items?: CartItem[];
};
