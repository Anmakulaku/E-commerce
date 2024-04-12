import { useEffect, useState } from 'react';
import { Product } from '../../utilities/types/ProductType';
import { useProducts } from '../../context/ProductContext';
import { useShoppingCart } from '../../context/CartContext';

export function useProductPageLogic(id: string) {
  // console.log('useProductPageLogic render');
  const { products } = useProducts();
  const { actions } = useShoppingCart();
  const { increaseCartQuantity } = actions;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const product: Product | null = products.find(item => item.id.toString() === id) || null;
  
  useEffect(() => {
    if (!id || products.length === 0) return;

    if (product) {
      if (product.img) {
        setMainImage(product.img);
      } else if (product.imgOther && product.imgOther.length > 0) {
        setMainImage(product.imgOther[0]);
      }
    } else {
      setError('Product not found');
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

  const renderImages = (mainImage: string | null, product: Product) => {
    console.log('renderImages...');
    const handleImageClick = (clickedImage: string) => {
      setMainImage(clickedImage);
    };
    return (
      <div className='productPage__images'>
        {mainImage && (
          <img
            src={mainImage}
            alt={product.name}
            className='productPage__imgMain'
          />
        )}
        <div className='productPage__imgOthers'>
          {[product.img, ...product.imgOther].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={
                index === 0
                  ? product.name
                  : `${product.name} - Additional Image ${index}`
              }
              onClick={() => handleImageClick(img)}
              className={img === mainImage ? 'selected' : ''}
            />
          ))}
        </div>
      </div>
    );
  };

  return {
    product,
    mainImage,
    selectedSize,
    quantity,
    isSizeSelected,
    addToCart,
    error,
    setSelectedSize,
    setMainImage,
    setQuantity,
    handleSizeSelection,
    decreaseQuantity,
    increaseQuantity,
    renderImages,
  };
}
