import React from 'react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import './RemoveButton.css'

interface RemoveButtonProps {
    itemId: number;
    size: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ itemId, size }) => {
    const { removeFromCart } = useShoppingCart();

    return (
        <button className='button removeButton__btn' onClick={() => removeFromCart(itemId, size)}>
            <span className='removeButton__title'>Remove</span> 
        </button>
    );
}

export default RemoveButton;
