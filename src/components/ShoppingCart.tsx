import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import './ShoppingCart.css';
import storeItems from "../data/itemsAll.json"


export function ShoppingCart() {
    const { closeCart, cartItems } = useShoppingCart();

    return (
        <div className="shoppingCart">
        <div className='shoppingCart__content'>
            <div className='shoppingCart__header'>
                <h2>Shopping Cart</h2>
                <p>Your Shopping Cart</p>
                <button className='shoppingCart__closeButton' onClick={closeCart}>
                    &times;
                </button>
            </div>
            {cartItems.map(item=> (
                <CartItem key={item.id} {...item} />
            ))}
            <div className="shoppingCart__priceBox">
                <div className="shoppingCart__totalPrice">
                    <span className="shoppingCart__totalPriceTitle">Total sum: {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(item=> item.id == cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0))}
                    </span>
                </div>
            </div>
        </div>
        </div>
    );
}
