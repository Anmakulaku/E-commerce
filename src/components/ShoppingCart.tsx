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
                const cartProductIds = cartItems.map(item => item.id); 
                const productsInCart = itemsAll.filter(item => cartProductIds.includes(item.id)); 
                setCartProducts(productsInCart);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, [cartItems]);

    const totalSum = cartItems.reduce((total, cartItem) => {
        const cartProduct = cartProducts.find(product => product.id === cartItem.id); 
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
                    {cartItems.map(item=> (
                        <CartItem key={item.id} {...item} />
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
