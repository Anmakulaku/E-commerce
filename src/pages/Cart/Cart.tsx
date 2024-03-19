import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import "./Cart.css";
import { CartItem } from "../../components/ShoppingCart/CartItem";

type CartItemProps ={
    id: number 
    quantity: number
    size: string
}

export function Cart() {
    const { cartItems: contextCartItems, isGiftWrapSelected, toggleGiftWrap } = useShoppingCart();
    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    
     // Przy załadowaniu komponentu pobierz dane z localStorage i zaktualizuj stan koszyka
    useEffect(() => {
        const localStorageCartItems = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
        setCartItems(localStorageCartItems);
    }, []);

    // Aktualizacja danych w localStorage, gdy zmienia się zawartość koszyka w kontekście
    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(contextCartItems));
    }, [contextCartItems]);

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
                        <CartItem key={`${item.id}-${item.size}-${index}`} {...item} id={item.id} quantity={item.quantity} size={item.size || ''} />
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
