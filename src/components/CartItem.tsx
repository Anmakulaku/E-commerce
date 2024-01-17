import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/itemsAll.json"
import { formatCurrency } from "../utilities/formatCurrency"
import "./CartItem.css"

type CartItemProps ={
    id: number 
    quantity: number
}

export function CartItem ({id, quantity}: CartItemProps) {
    const { removeFromCart }= useShoppingCart()
    const item = storeItems.find(item=> item.id ==id)
    if (item == null) return null

    return(
        <div className="cartItem__content">
            <div className="cartItem__item">
                <img src={item.img} alt="product image"/>
                <div className="cartItem__text">
                    <h3 className="cartItem__title">{item.name}</h3> {quantity >= 1 && <span>Amount: {quantity}</span>}
                    <p className="cartItem__price">{formatCurrency(item.price)}</p>
                    <div className="cartItem__amountPrice">
                        <span className="cartItem__amountPrice">{formatCurrency(item.price*quantity)}</span>
                        <button className='button cartItem__btnRemove' onClick={() => removeFromCart(item.id)}>
                            <span className='cartItem__btnRemoveStyle'>&times;</span> 
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    )
}