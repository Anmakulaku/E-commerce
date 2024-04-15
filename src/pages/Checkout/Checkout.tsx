import './Checkout.css';
import { useState } from 'react';

interface Point {
  name: string;
  city: string;
  street: string;
}

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handlePointSelection = (selectedPoint: Point) => {
    setSelectedPoint(selectedPoint);
  };
  const handleChoosePointDelivery = () => {
    PPWidgetApp.toggleMap({ callback: handlePointSelection });
  };

  return (
    <div className='checkout'>
      <div className='checkout__content'>
        <h1 className='checkout__title'>FASCO Checkout</h1>
        <div className='checkout__container'>
          <div className='checkout__info'>
            <section className='checkout__delivery'>
              <h2>Delivery</h2>
              <form className='checkout__deliveryForm'>
                <div className='checkout__formItem-double'>
                  <select
                    id='country'
                    name='country'
                    className='checkout__inputField'
                  >
                    <option value='' className='checkout__countryName'>
                      Region / Country
                    </option>
                    <option value='Polnad' className='checkout__countryName'>
                      Poland
                    </option>
                    <option value='Slovakia' className='checkout__countryName'>
                      Slovakia
                    </option>
                    <option
                      value='CzechRepulbic'
                      className='checkout__countryName'
                    >
                      Czech Republic
                    </option>
                  </select>
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='First name'
                    className='checkout__inputField'
                  />
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Last name'
                    className='checkout__inputField'
                  />
                </div>
                <div className='checkout__formItem-double'>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    placeholder='Address'
                    className='checkout__inputField'
                  />
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    placeholder='City'
                    className='checkout__inputField'
                  />
                </div>
                <div className='checkout__formItem'>
                  <input
                    type='text'
                    id='postalCode'
                    name='postalCode'
                    placeholder='Postal code'
                    className='checkout__inputField'
                  />
                </div>
                <div className='checkout__formItem checkout__formItem-double'>
                  <label className='save-info-label'>
                    <input type='checkbox' className='save-info-checkbox' />
                    Save This Info for future
                  </label>
                </div>
              </form>
              <button
                className='button checkout__button'
                onClick={handleChoosePointDelivery}
              >
                Delivery Point
              </button>
              {selectedPoint && (
                <div className='checkout-pointInfo'>
                  <p className='checkout-pointInfoTitle'>Wybrany paczkomat: </p>
                  <p>{selectedPoint.name}</p>
                  <p>{selectedPoint.city}</p>
                  <p>{selectedPoint.street}</p>
                </div>
              )}
            </section>
            <section className='checkout__payment'>
              <h2>Payment</h2>
              <div className='checkout__formItem-double'>
                <select
                  id='paymentMethod'
                  name='paymentMethod'
                  className='checkout__inputField'
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                >
                  <option value='' className='checkout__paymentMethod'>
                    Choose Payment Method
                  </option>
                  <option
                    value='creditCard'
                    className='checkout__paymentMethod'
                  >
                    Credit Card
                  </option>
                  <option value='paypal' className='checkout__paymentMethod'>
                    PayPal
                  </option>
                  <option value='afterpay' className='checkout__paymentMethod'>
                    Afterpay
                  </option>
                </select>
                {paymentMethod === 'creditCard' && (
                  <div className='creditCardForm'>
                    <input
                      type='text'
                      id='cardNumber'
                      name='cardNumber'
                      placeholder='Card Number'
                      className='checkout__inputField'
                    />
                    <input
                      type='text'
                      id='expirationDate'
                      name='expirationDate'
                      placeholder='Expiration Date'
                      className='checkout__inputField'
                    />
                    <input
                      type='text'
                      id='securityCode'
                      name='securityCode'
                      placeholder='Security Code'
                      className='checkout__inputField'
                    />
                    <input
                      type='text'
                      id='cardHolderName'
                      name='cardHolderName'
                      placeholder='Card Holder Name'
                      className='checkout__inputField'
                    />
                  </div>
                )}
              </div>
              <div className='checkout__formItem checkout__formItem-double'>
                <label className='save-info-label'>
                  <input type='checkbox' className='save-info-checkbox' />
                  Save This Info for future
                </label>
              </div>
            </section>
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
