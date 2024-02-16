import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product } from "../utilities/services/items.service";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import './ShoppingCart.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { itemsAll } from "../_mocks_/itemsAll";

export function ShoppingCart() {
    const { closeCart, cartItems, isGiftWrapSelected, toggleGiftWrap } = useShoppingCart();
    const giftWrapPrice = 10;
    const [cartProducts, setCartProducts] = useState<Product[]>([]); 

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const cartProductIds = cartItems.map(item => item.id); // Pobierz identyfikatory produktów w koszyku
                const productsInCart = itemsAll.filter(item => cartProductIds.includes(item.id)); // Wybierz tylko te produkty, które są w koszyku
                setCartProducts(productsInCart);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, [cartItems]);

    const totalSum = cartItems.reduce((total, cartItem) => {
        const cartProduct = cartProducts.find(product => product.id === cartItem.id); // Użyj produktów w koszyku do obliczenia sumy cen
        return total + (cartProduct?.price || 0) * cartItem.quantity;
    }, 0);

    const totalSumWithGiftWrap = isGiftWrapSelected ? totalSum + giftWrapPrice : totalSum;

    return (
        <div className="shoppingCartOverlay">
            <div className="shoppingCart">
                <div className='shoppingCart__content'>
                    <div className='shoppingCart__header'>
                        <h2 className='shoppingCart__title'>Shopping Cart</h2>
                        <span className='shoppingCart__shippingInfo'>Free shipping over $150</span>
                        <button className='shoppingCart__closeButton' onClick={closeCart}>
                            &times;
                        </button>
                    </div>
                    {/* <>{console.log("ShoppingCart:", cartItems)}</> */}
                    {
                    cartItems.map((item, index)=> (
                        <CartItem key={`${item.id}-${item.size}-${index}`} {...item} id={item.id} quantity={item.quantity} size={item.size} />
                    ))}
                    <div className="shoppingCart__footer">
                        <div className="shoppingCart__totalPrice">
                            <span className="shoppingCart__totalPriceTitle">Subtotal 
                            <p>{formatCurrency(totalSumWithGiftWrap)}</p>
                            </span>
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
                        <Link to="/cart" className="button shoppingCart__btn" onClick={closeCart}><span>View Cart</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
