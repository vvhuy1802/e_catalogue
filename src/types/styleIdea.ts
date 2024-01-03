export type StyeIdeaRequest = {};

export type StyleIdeaResponse = {
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

  images: {
    id: number;
    image: string;
  }[];
};
