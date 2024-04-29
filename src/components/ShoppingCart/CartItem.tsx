import { useContext } from 'react';
import { formatCurrency } from '../../utilities/formatCurrency';
import './CartItem.css';
import { ProductsContext } from '../../context/ProductContext';

type CartItemProps = {
  id: number;
  quantity: number;
  size: string;
};

const useCart = () => useContext(ProductsContext);

export function CartItem({ id, size, quantity }: CartItemProps) {
  const { products } = useCart();

  const item = products.find(product => product.id === id);

  if (!item) return null;

  return (
    <div className='cartItem__content'>
      <div className='cartItem__item'>
        <img className='cartItem__itemImg' src={`http://localhost:3001/images/${item.img}`} alt='product image' />
        <div className='cartItem__text'>
          <h3 className='cartItem__title'>{item.name}</h3>
          <p className='cartItem__title'>Size: {size}</p>
          <div className='cartItem__amountPrice'>
            <p className='cartItem__price'>
              Price: <span>{formatCurrency(item.price)}</span>
            </p>
            <p className='cartItem__price'>
              Sum: <span>{formatCurrency(item.price * quantity)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
