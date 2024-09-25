import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';
import './StoreItem.css';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import { Product } from '../../utilities/types/ProductType';

interface StoreItemProps {
  id: string;
}

export default function StoreItem({ id }: StoreItemProps) {
  const { products } = useContext(ProductsContext);

  const item = products.find((product: Product) => product.id === id);

  if (!item) return null;

  const mainImage = item.images.find(image => image.isMain)?.imageUrl || '';

  const baseUrl = import.meta.env.VITE_API_URL;

  return (
    <Link to={`/product/${id}`} className='storeItem__container'>
      <div className='storeItem__img'>
        {mainImage && (
          <img
            src={`${baseUrl}${mainImage}`}
            alt='Product Image'
            width='150px'
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
}
