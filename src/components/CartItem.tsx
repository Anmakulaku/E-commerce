import { useShoppingCart } from "../context/ShoppingCartContext"
import { Product, getItemById } from "../utilities/services/items.service"
import { formatCurrency } from "../utilities/formatCurrency"
import "./CartItem.css"
import { useEffect, useState } from "react"

type CartItemProps ={
    id: number 
    quantity: number
    size?: string
}

export function CartItem ({id, size, quantity}: CartItemProps) {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity }= useShoppingCart()

    const [item, setItem] = useState<Product | null>(null);

    useEffect(() => {
        getItemById(id)
            .then(item => {
                setItem(item);
            })
            .catch(error => {
                console.error('Error fetching item:', error);
            });
    }, [id]);

    if (!item) return null;
    // console.log("Size in CartItem:", size); 

    return(
        <div className="cartItem__content">
            <div className="cartItem__item">
                <img className="cartItem__itemImg" src={item.img} alt="product image"/>
                <div className="cartItem__text">
                    <h3 className="cartItem__title">{item.name}</h3> 
                    <p className="cartItem__title">Size: {size}</p> 
                    <div className="cartItem__quantity">
                        <div className="cartItem__quantityBtns">
                            <button className='button cartItem__btn' onClick={() => item.size && decreaseCartQuantity(item.id, item.size)}>-</button>
                            {quantity >= 1 && <span>{quantity}</span>}
                            <button className='button cartItem__btn' onClick={() => item.size && increaseCartQuantity(item.id, item.size)}>+</button>
                        </div>
                        <button className='button cartItem__btnRemove' onClick={() => removeFromCart(item.id)}>
                            <span className='cartItem__btnRemoveStyle'>Remove</span> 
                        </button> 
                    </div>
                    <div className="cartItem__amountPrice">
                        <p className="cartItem__price">Price: <span>{formatCurrency(item.price)}</span></p>
                        <p className="cartItem__price">Sum: <span>{formatCurrency(item.price*quantity)}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
