import { CartItem } from '../../components/ShoppingCart/CartItem';
import { useShoppingCart } from '../../context/CartContext';
import { formatCurrency } from '../../utilities/formatCurrency';
import './Checkout.css';
import { useEffect, useState } from 'react';

interface Point {
  name: string;
  city: string;
  street: string;
}
interface OrderFormData {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: string;
  totalCost: number;
  delivery_point: string;
}

const Checkout = () => {
  const { state, meta, actions } = useShoppingCart();
  const { cartItems } = state;
  const { totalSumWithGiftWrap } = meta;
  const { clearCart } = actions;
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postal_code: '',
    totalCost: 0,
    delivery_point: '',
  });
  const SHIPPING_PRICE = 1500;
  const totalCost = totalSumWithGiftWrap + SHIPPING_PRICE;

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      totalCost: totalCost,
    }));
  }, [totalCost]);

  const handlePointSelection = (selectedPoint: Point) => {
    setSelectedPoint(selectedPoint);
    setFormData({ ...formData, delivery_point: selectedPoint.name });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChoosePointDelivery = () => {
    if (window.PPWidgetApp) {
      window.PPWidgetApp.toggleMap({ callback: handlePointSelection });
    } else {
      console.error('PPWidgetApp is not defined');
    }
  };

  const handleConfirmDelivery = async () => {
    try {
      console.log('Cart items:', cartItems);
      console.log('FormData before sending:', formData);
      if (
        !formData.first_name ||
        !formData.last_name ||
        !formData.address ||
        !formData.city ||
        !formData.postal_code ||
        !formData.delivery_point
      ) {
        throw new Error('Please fill in all required fields');
      }

      const dataToSend = {
        ...formData,
        cart: cartItems.map(item => ({
          ...item,
          size_name: item.size // zmień nazwę pola size na size_name
        }))
      };
      console.log('Data to send:', dataToSend);

      //wysłanie danych do backendu
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      console.log('Server response:', response);
      // Sprawdź, czy odpowiedź serwera jest OK
      if (!response.ok || !response) {
        throw new Error('Network response was not ok');
      }
      const redirectUri = await response.text();
      window.location.href = redirectUri;
      // Pobierz dane z odpowiedzi serwera
      // const data: ServerResponse = await response.json();
      // console.log(data.message);
      clearCart();
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className='checkout'>
      <div className='checkout__content'>
        <h1 className='checkout__title'>FASCO Checkout</h1>
        <div className='checkout__container'>
          <div className='checkout__info'>
            <section className='checkout__delivery'>
              <h2>Delivery</h2>
              <div className='checkout__formItem-double'></div>
              <form className='checkout__deliveryForm'>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='first_name'
                    name='first_name'
                    placeholder='First name'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='last_name'
                    name='last_name'
                    placeholder='Last name'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='checkout__formItem-double'>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    placeholder='Address'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    placeholder='City'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='postal_code'
                    name='postal_code'
                    placeholder='Postal code'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                </div>
                {/* <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='totalCost'
                    name='totalCost'
                    placeholder='totalCost'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                </div> */}
              </form>
              <div className='checkout__formItem checkout__formItem-double'>
                <label className='save-info-label'>
                  <input type='checkbox' className='save-info-checkbox' />
                  Save This Info for future
                </label>
              </div>
              <button
                className='button checkout__button'
                onClick={handleChoosePointDelivery}
              >
                Delivery Point
              </button>
              {selectedPoint && (
                <div className='checkout-pointInfo'>
                  <p className='checkout-pointInfoTitle'>Delivery Point: </p>
                  <p>{selectedPoint.name}</p>
                  <p>{selectedPoint.city}</p>
                  <p>{selectedPoint.street}</p>
                </div>
              )}
              <h2 className='checkout__payment'>Payment Method:</h2>
              <div className='checkout__formItem'>
                <p> PayU</p>
              </div>
              <button
                className='button checkout__button'
                onClick={handleConfirmDelivery}
              >
                Confirm
              </button>
            </section>
          </div>
          <div className='checkout__prices'>
            <div className='checkout__cart'>
              <h2>Summary</h2>
              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.size}-${index}`}
                  {...item}
                  id={item.id}
                  quantity={item.quantity}
                  size={item.size || ''}
                />
              ))}
              <div className='cart__checkoutPrices'>
                <div className='cart__subtotalPrice'>
                  <span className='cart__subtotalPriceTitle'>Subtotal</span>
                  <p>{formatCurrency(totalSumWithGiftWrap)}</p>
                </div>
                <div className='cart__shippingPrice'>
                  <span className='cart__shippingPriceTitle'>Shipping</span>
                  <p>{formatCurrency(SHIPPING_PRICE)}</p>
                </div>
                <div className='cart__totalPrice'>
                  <span className='cart__totalPriceTitle'>Total</span>
                  <p id='totalCost'>{formatCurrency(totalCost)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='checkout__cart'>
            <h2>Shopping Cart</h2>
            <Cart/>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
