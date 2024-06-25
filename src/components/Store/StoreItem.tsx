import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';
import './StoreItem.css';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const useCart = () => useContext(ProductsContext);

export default function StoreItem({ id, name, price, image_url }: StoreItemProps) {
  const { products } = useCart();

  const item = products.find(product => product.id === id);
  console.log('StoreItem data:', item);

  if (!item) return null;

  return (
    <Link to={`/product/${id}`} className='storeItem__container'>
      <div className='storeItem__img'>
        <img src={`http://localhost:3000${image_url}`}  alt='product-image' />
      </div>
      <div className='storeItem__text'>
        <h1 className='storeItem__title'>{name}</h1>
        <span className='storeItem__price'>{formatCurrency(price)}</span>
      </div>
    </Link>
  );
}
