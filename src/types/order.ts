import {Normalized} from '.';

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

export type CartVariant = {
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
  item_id?: number;
};

export type NormalizeCartVariant = {
  ids: Array<number>;
  entities: {
    [key: string]: CartVariant;
  };
};
type CartStore = {
  ids: Array<number>;
  entities: {
    [key: string]: {
      id: number;
      name: string;
      description: string;
      address: 0;
      logo_image: string;
      cover_image: string;
      approved: boolean;
      items: NormalizeCartVariant;
    };
  };
};
export type CartResponse = {
  id: number;
  stores: CartStore;
};

export type OrderParams = {
  contact_id: number;
  items: Array<number>;
};

export type OrderResponse = {
  cancelled_date: string;
  contact_id: number;
  deliver_status: string;
  delivered_date: string;
  delivery_date: string;
  id: number;
  items: Array<{
    id: number;
    product_variant: number;
    quantity: number;
  }>;
  order_date: string;
  store_id: number;
  total_price: number;
  user_id: number;
};

export type OrderAdminStore = {
  id: number;
  store_id: number;
  user_id: number;
  contact_id: number;
  total_price: number;
  deliver_status: 'pending' | 'delivering' | 'delivered' | 'canceled';
  order_date: string;
  delivery_date: string;
  delivered_date: string;
  cancelled_date: string;
  items: NormalizeCartVariant;
};
