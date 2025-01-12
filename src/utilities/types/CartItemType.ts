import { Product } from './ProductType';

export type CartItem = Product & {
  id: string;
  quantity: number;
  size?: string;
  name?: string;
  price?: number;
};
