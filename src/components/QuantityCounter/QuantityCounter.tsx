import React from 'react';
import { useShoppingCart } from '../../context/CartContext';
import './QuantityCounter.css'

interface QuantityCounterProps {
    itemId: number;
    size: string;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({ itemId, size }) => {
    const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } = useShoppingCart();
    const quantity = getItemQuantity(itemId, size);

    return (
        <div className="quantityCounter">
            <button className="button quantityCounter__button" onClick={() => decreaseCartQuantity(itemId, size)}>-</button>
            <span className="quantityCounter__quantity">{quantity}</span>
            <button className="button quantityCounter__button" onClick={() => increaseCartQuantity(itemId, size)}>+</button>
        </div>
    );
}

export default QuantityCounter;
