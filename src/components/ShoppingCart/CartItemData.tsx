import React from 'react';
import { Product } from '../../utilities/services/items.service';
import { formatCurrency } from '../../utilities/formatCurrency';
import './CartItemData.css'

type CartItemDataProps = {
    product: Product;
    selectedSize: string | null;
};

export const CartItemData: React.FC<CartItemDataProps> = ({ product, selectedSize }) => {
    console.log(product);
    if (!product) {
        return ("Brak produktu"); 
    }
    return (
        <div className="cartItemData__content">
            <img className="cartItemData__itemImg" src={product.img} alt="product image"/>
            <div className="cartItemData__text">
                <h3 className="cartItemData__title">{product.name}</h3>
                <p className="cartItemData__price">Price: {formatCurrency(product.price)}</p>
                <p className="cartItemData__size">Size: {selectedSize}</p>
            </div>
        </div>
    );
};

