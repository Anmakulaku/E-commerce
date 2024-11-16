import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';
import './StoreItem.css';
import { memo, useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import { Product } from '../../utilities/types/ProductType';

interface StoreItemProps {
  id: string;
}

const StoreItem = memo(({ id }: StoreItemProps) => {
  const { products } = useContext(ProductsContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const item = products.find((product: Product) => product.id === id);

  if (!item) {
    return (
      <Link to={`/product/${id}`} className='storeItem__container'>
        <div className='storeItem__img skeleton'></div>
        <div className='storeItem__text'>
          <div className='storeItem__title skeleton'></div>
          <div className='storeItem__price skeleton'></div>
        </div>
      </Link>
    );
  }

  const mainImage = item.images.find(image => image.isMain)?.imageUrl || '';
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <Link to={`/product/${id}`} className={`storeItem__container ${isImageLoaded ? 'loaded' : ''}`}>
      <div className={`storeItem__img ${isImageLoaded ? 'loaded' : ''}`}>
        {mainImage && (
          <img
            src={`${baseUrl}${mainImage}`}
            alt='Product Image'
            width='150px'
            loading='lazy'
            onLoad={handleImageLoad} 
          />
        )}
      </div>
      <div className='storeItem__text'>
        <h1 className='storeItem__title'>{item.name}</h1>
        <span className='storeItem__price'>{formatCurrency(item.price)}</span>
      </div>
      {/* <div className='storeItem__category'>
        <span className='storeItem__subcategory'>{item.category.name}</span>
        {' - '}
        <span className='storeItem__category'>{item.subcategory.name}</span>
      </div> */}
    </Link>
  );
});
export default StoreItem;