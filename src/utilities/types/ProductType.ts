export interface Product {
  id: number;
  gender: string;
  category: string;
  subcategory?: string;
  image_url: string;
  imgOther: string;
  name: string;
  price: number;
  addDate: Date;
  sizes: { sizeName: string; value: number }[];
}
