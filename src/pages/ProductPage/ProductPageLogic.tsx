import { useEffect, useState } from 'react';
import { Product } from '../../utilities/types/ProductType';
import { useProducts } from '../../context/ProductContext';
import { useShoppingCart } from '../../context/CartContext';

export function useProductPageLogic(id: string) {
  const { products } = useProducts();
  const { actions, state } = useShoppingCart();
  const { increaseCartQuantity, setQuantity } = actions;
  const { quantity } = state;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);

  const product: Product | null =
    products.find(item => item.id.toString() === id) || null;

  useEffect(() => {
    if (!id || products.length === 0) return;

    if (!product) {
      console.error('Product not found');
    }
  }, [id, product, products]);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
    setIsSizeSelected(false);
  };

  const addToCart = () => {
    if (!selectedSize || !product) {
      setIsSizeSelected(true);
      return;
    }
    for (let i = 0; i < quantity; i++) {
      increaseCartQuantity(product.id, selectedSize || '');
    }
    setQuantity(1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  return {
    product,
    selectedSize,
    quantity,
    isSizeSelected,
    addToCart,
    handleSizeSelection,
    decreaseQuantity,
    increaseQuantity,
  };
}
