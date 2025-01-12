import { useShoppingCart } from '../../context/CartContext';
import { formatCurrency } from '../../utilities/formatCurrency';
// import { CartItem } from "./CartItem";
import './ShoppingCart.css';
import { Link } from 'react-router-dom';
import CartItemBox from './CartItemBox';
import { useCartOverlay } from '../../context/OverlayContext';

export function ShoppingCart() {
  const { state, actions, meta } = useShoppingCart();
  const { isGiftWrapSelected, cartItems } = state;
  const { toggleGiftWrap } = actions;
  const { totalSumWithGiftWrap } = meta;
  const { closeCart } = useCartOverlay();

  return (
    <div className='shoppingCartOverlay'>
      <div className='shoppingCart'>
        <div className='shoppingCart__content'>
          <div className='shoppingCart__header'>
            <h2 className='shoppingCart__title'>Shopping Cart</h2>
            <span className='shoppingCart__shippingInfo'>
              Free shipping over 150 PLN
            </span>
            <button className='shoppingCart__closeButton' onClick={closeCart}>
              &times;
            </button>
          </div>
          {cartItems.map((item, index) => (
            <CartItemBox
              key={`${item.id}-${item.size}-${index}`}
              {...item}
              id={item.id}
              quantity={item.quantity}
              size={item.size || ''}
            />
          ))}
          <div className='shoppingCart__footer'>
            <div className='shoppingCart__totalPrice'>
              <span className='shoppingCart__totalPriceTitle'>
                Subtotal
                <p>{formatCurrency(totalSumWithGiftWrap)}</p>
              </span>
            </div>
            <div className='shoppingCart__giftWrap'>
              <input
                type='checkbox'
                id='giftWrapCheckbox'
                checked={isGiftWrapSelected}
                onChange={toggleGiftWrap}
              />
              <label htmlFor='giftWrapCheckbox'> Add Gift Wrap (50 PLN)</label>
            </div>
            <Link
              to='/cart'
              className='button shoppingCart__btn'
              onClick={closeCart}
            >
              <span>View Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
