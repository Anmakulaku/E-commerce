import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/itemsAll.json"
import { formatCurrency } from "../utilities/formatCurrency"
import "./CartItem.css"

type CartItemProps ={
    id: number 
    quantity: number
}

export function CartItem ({id, quantity}: CartItemProps) {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity }= useShoppingCart()
    const item = storeItems.find(item=> item.id ==id)
    if (item == null) return null

    return(
        <div className="cartItem__content">
            <div className="cartItem__item">
                <img src={item.img} alt="product image"/>
                <div className="cartItem__text">
                    <h3 className="cartItem__title">{item.name}</h3> 
                    <div className="cartItem__quantity">
                        <div className="cartItem__quantityBtns">
                            <button className='button cartItem__btn' onClick={() => decreaseCartQuantity(item.id)}>-</button>
                                {quantity >= 1 && <span>{quantity}</span>}
                            <button className='button cartItem__btn' onClick={() => increaseCartQuantity(item.id)}>+</button>
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