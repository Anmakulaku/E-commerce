import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';
import './StoreItem.css';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';

interface StoreItemProps {
  id: string;
  name: string;
  price: number;
}

const useCart = () => useContext(ProductsContext);

export default function StoreItem({ id, name, price }: StoreItemProps) {
  const { products } = useCart();

  const item = products.find(product => product.id === id);

  if (!item) return null;

  const mainImage = item.images.length > 0 ? item.images[0] : null;

  return (
    <Link to={`/product/${id}`} className='storeItem__container'>
      <div className='storeItem__img'>
        {mainImage && (
          <img
            src={`http://localhost:3000${mainImage.imageUrl}`}
            alt='Product Image'
            width='150px'
          />
        )}
      </div>
      <div className='storeItem__text'>
        <h1 className='storeItem__title'>{name}</h1>
        <span className='storeItem__price'>{formatCurrency(price)}</span>
      </div>
    </Link>
  );
}
