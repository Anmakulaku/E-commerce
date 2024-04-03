import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../utilities/types/ProductType';
import { getAllItems } from '../utilities/services/items.service';

type ProductsContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
});

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllItems().then(data => {
      setProducts(data);
    });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
