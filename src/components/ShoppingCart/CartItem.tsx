import { formatCurrency } from "../../utilities/formatCurrency"
import "./CartItem.css"
import { useCartItemLogic } from "./CartItemLogic"
import QuantityCounter  from '../QuantityCounter/QuantityCounter';
import RemoveButton from "../RemoveButton/RemoveButton";

type CartItemProps ={
    id: number 
    quantity: number
    size: string
}

export function CartItem ({id, size, quantity}: CartItemProps) {
    const item = useCartItemLogic(id);

    if (!item) return null;

    return(
        <div className="cartItem__content">
            <div className="cartItem__item">
                <img className="cartItem__itemImg" src={item.img} alt="product image"/>
                <div className="cartItem__text">
                    <h3 className="cartItem__title">{item.name}</h3> 
                    <p className="cartItem__title">Size: {size}</p> 
                    <div className="cartItem__quantity">
                        <QuantityCounter itemId={item.id} size={size} />
                        <RemoveButton itemId={item.id} size={size} />
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
