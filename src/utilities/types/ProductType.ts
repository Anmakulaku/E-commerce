export interface Image {
  imageUrl: string;
}

export interface Product {
  id: string;
  gender: string;
  category: string;
  subcategory?: string;
  images: Image[];
  // imgOther: string[];
  name: string;
  price: number;
  addDate: Date;
  sizes: { sizeName: string; value: number }[];
}
