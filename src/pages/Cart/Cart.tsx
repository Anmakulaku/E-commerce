import { CartItem } from "../../components/ShoppingCart/CartItem";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import "./Cart.css";

export function Cart() {
    const { cartItems, isGiftWrapSelected, toggleGiftWrap } = useShoppingCart();

    return (
        <div className="cart">
            <div className="cart__content"> 
                <h1 className="cart__title">Shopping Cart</h1>
                <div className="cart__table">
                    <div className="cart__tableTitles">
                        <p>Product</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </div>
                    <div className="cart__items">
                        {cartItems.map((item, index) => (
                            <div key={`${item.id}-${item.size}-${index}`} className="cart__item"> 
                                <CartItem {...item} id={item.id} quantity={item.quantity} size={item.size || ''} /> 
                            </div>
                        ))}
                    </div>
                    <div className="shoppingCart__footer">
                        <div className="shoppingCart__totalPrice">
                            <span className="shoppingCart__totalPriceTitle">Subtotal</span>
                        </div>
                        <div className="shoppingCart__giftWrap">
                            <input
                                type="checkbox"
                                id="giftWrapCheckbox"
                                checked={isGiftWrapSelected}
                                onChange={toggleGiftWrap}
                            />
                            <label htmlFor="giftWrapCheckbox">  Add Gift Wrap ($10)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
