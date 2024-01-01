export type Favorite = {
  contentId: string;
  contentType: string;
  collectionId: string;
};

export type CollectionResponse = {
  id: string;
  userId: string;
  name: string;
  image: string;
  favorites: Array<{
    id: string;
    contentId: string;
    contentType: string;
  }>;
};
