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
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  totalCost: number;
  deliveryPoint: string;
}

const Checkout = () => {
  const { state, meta, actions } = useShoppingCart();
  const { cartItems } = state;
  const { totalSumWithGiftWrap } = meta;
  const { clearCart } = actions;
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    totalCost: 0,
    deliveryPoint: '',
  });

  const [errorMessages, setErrorMessages] = useState<{
    firstName?: string;
    lastName?: string;
    city?: string;
    postalCode?: string;
    deliveryPoint?: string;
    general?: string;
  }>({});

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
    setFormData({ ...formData, deliveryPoint: selectedPoint.name });
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
      const errors: { [key: string]: string } = {};

      // Sprawdzanie, czy wszystkie pola są uzupełnione
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.address ||
        !formData.city ||
        !formData.postalCode
      ) {
        errors['general'] = 'Please fill in all fields';
      }

      // Regex dla pól imienia, nazwiska i miasta
      const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

      if (formData.firstName && !nameRegex.test(formData.firstName)) {
        errors.firstName = 'Invalid character in first name';
      }

      if (formData.lastName && !nameRegex.test(formData.lastName)) {
        errors.lastName = 'Invalid character in last name';
      }

      if (formData.city && !nameRegex.test(formData.city)) {
        errors.city = 'Invalid character in city';
      }
      // Sprawdzanie formatu kodu pocztowego
      const postalCodeRegex = /^\d{2}-\d{3}$/;
      if (formData.postalCode && !postalCodeRegex.test(formData.postalCode)) {
        errors.postalCode = 'Postal code must be in the format xx-xxx';
      }

      // Sprawdzanie, czy punkt dostawy został wybrany
      if (!formData.deliveryPoint) {
        errors.deliveryPoint = 'Please choose a delivery point';
      }

      if (Object.keys(errors).length > 0) {
        setErrorMessages(errors);
        return;
      }

      const dataToSend = {
        ...formData,
        cart: cartItems.map(item => ({
          productId: item.id,
          sizeName: item.size,
          quantity: item.quantity,
        })),
      };

      // console.log('Data to send:', dataToSend);

      //wysłanie danych do backendu
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      // console.log('Server response:', response);
      //Czy odpowiedź serwera jest OK?
      if (!response.ok || !response) {
        throw new Error('Network response was not ok');
      }
      // dane z odpowiedzi serwera
      const data = await response.json();
      // console.log('Redirect URL:', data.redirectUrl);
      window.location.href = data.redirectUrl;
      clearCart();
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <section className='checkout'>
      <div className='checkout__content'>
        <h1 className='checkout__title'>FASCO Checkout</h1>
        <div className='checkout__container'>
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

          <div className='checkout__info'>
            <section className='checkout__delivery'>
              <h2>Delivery</h2>
              <div className='checkout__formItem-double'></div>
              <form className='checkout__deliveryForm'>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='First name'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                  {errorMessages.firstName && (
                    <p className='error'>{errorMessages.firstName}</p>
                  )}
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Last name'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                  {errorMessages.lastName && (
                    <p className='error'>{errorMessages.lastName}</p>
                  )}
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
                  {errorMessages.city && (
                    <p className='error'>{errorMessages.city}</p>
                  )}
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='postalCode'
                    name='postalCode'
                    placeholder='Postal code'
                    className='checkout__inputField'
                    onChange={handleInputChange}
                  />
                  {errorMessages.postalCode && (
                    <p className='error'>{errorMessages.postalCode}</p>
                  )}
                </div>
              </form>
              <div className='checkout__formItem checkout__formItem-double'>
                <label className='save-info-label'>
                  <input type='checkbox' className='save-info-checkbox' />
                  Save This Info for future
                </label>
                {errorMessages.general && (
                  <p className='error'>{errorMessages.general}</p>
                )}
              </div>
              <div className='checkout-deliveryInfo'>
                {errorMessages.deliveryPoint && (
                  <p className='error'>{errorMessages.deliveryPoint}</p>
                )}
                <button
                  className='button checkout__button'
                  onClick={handleChoosePointDelivery}
                >
                  Delivery Point
                </button>
              </div>
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
        </div>
      </div>
    </section>
  );
};

export default Checkout;
