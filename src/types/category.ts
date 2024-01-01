export type RootCategory = {
  id: number;
  name: string;
  description: string;
  image: string;
  children: RootCategory[];
};
