import React from 'react';
import QuantityCounter from '../QuantityCounter/QuantityCounter';
import RemoveButton from '../RemoveButton/RemoveButton';
import { CartItem } from './CartItem';
import './CartItemBox.css';

interface CartItemBoxProps {
  id: number;
  size: string;
  quantity: number;
  image_url: string;
}

const CartItemBox: React.FC<CartItemBoxProps> = ({ id, size, quantity,  image_url }) => {
  return (
    <div className='cartItemBox'>
      <CartItem id={id} size={size} quantity={quantity}  image_url={ image_url} />
      <div className='cartiItemBox__buttons'>
        <QuantityCounter itemId={id} size={size} />
        <RemoveButton itemId={id} size={size} />
      </div>
    </div>
  );
};

export default CartItemBox;
