import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/CartContext"
import { Subscribe } from "../../components/Subscribe/Subscribe";
import { Footer } from "../../components/Footer/Footer";
import CartItemBox from "../../components/ShoppingCart/CartItemBox";
import { formatCurrency } from "../../utilities/formatCurrency";
import "./Cart.css"
import { Link } from "react-router-dom";

type CartItemProps ={
    id: number 
    quantity: number
    size: string
}

export function Cart() {
    const { cartItems: contextCartItems, isGiftWrapSelected, toggleGiftWrap, totalSumWithGiftWrap } = useShoppingCart();
    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    
     // Przy załadowaniu komponentu pobierz dane z localStorage i zaktualizuj stan koszyka
    useEffect(() => {
        const localStorageCartItems = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
        setCartItems(localStorageCartItems);
    }, []);

    // Aktualizacja danych w localStorage, gdy zmienia się zawartość koszyka w context
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
                    {cartItems.map((item, index)=> (
                        <CartItemBox key={`${item.id}-${item.size}-${index}`} {...item} id={item.id} quantity={item.quantity} size={item.size || ''} /> // zmiana komponentu na CartItemBox
                    ))}
                    <div className="cart__footer">
                        <div className="cart__footerContent">
                            <div className="cart__giftWrap">
                                <input
                                    type="checkbox"
                                    id="giftWrapCheckbox"
                                    checked={isGiftWrapSelected}
                                    onChange={toggleGiftWrap}
                                />
                                <label htmlFor="giftWrapCheckbox">  Add Gift Wrap ($10)</label>
                            </div>
                            <div className="cart__totalPrice">
                                <span className="cart__totalPriceTitle">Subtotal</span>
                                <p>{formatCurrency(totalSumWithGiftWrap)}</p>
                                
                            </div>
                            <Link to="/checkout" className="button cart__btn">
                                <span>Checkout</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <Subscribe />
                <Footer />
            </div>
        </div>
    );
}
