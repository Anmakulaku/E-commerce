import React from 'react';
import QuantityCounter from '../QuantityCounter/QuantityCounter';
import RemoveButton from '../RemoveButton/RemoveButton';
import { CartItem } from './CartItem';
import './CartItemBox.css';

interface CartItemBoxProps {
  id: string;
  size: string;
  quantity: number;
}

const CartItemBox: React.FC<CartItemBoxProps> = ({ id, size, quantity }) => {
  return (
    <div className='cartItemBox'>
      <CartItem id={id} size={size} quantity={quantity} />
      <div className='cartiItemBox__buttons'>
        <QuantityCounter itemId={id} size={size} />
        <RemoveButton itemId={id} size={size} />
      </div>
    </div>
  );
};

export default CartItemBox;
