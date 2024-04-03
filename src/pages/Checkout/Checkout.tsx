import './Checkout.css'

function Checkout() {
    return (
        <div className="checkout">
            <div className='checkout__content'>
                <h1 className="checkout__title">FASCO Checkout</h1>
                <div className="checkout__container">
                    <div className="checkout__delivery">
                        <h2>Delivery</h2>
                        <form className="checkout__deliveryForm">
                            <div className="checkout__formItem checkout__formItem-double">
                                <input type="text" id="country" name="country" placeholder="Country / Region" className='checkout__inputField'/>
                            </div>
                            <div className="checkout__formItem">
                                <input type="text" id="firstName" name="firstName" placeholder="First name" className='checkout__inputField'/>
                            </div>
                            <div className="checkout__formItem">
                                <input type="text" id="lastName" name="lastName" placeholder="Last name" className='checkout__inputField'/>
                            </div>
                            <div className="checkout__formItem checkout__formItem-double">
                                <input type="text" id="address" name="address" placeholder="Address" className='checkout__inputField'/>
                            </div>
                            <div className="checkout__formItem">
                                <input type="text" id="city" name="city" placeholder="City" className='checkout__inputField'/>
                            </div>
                            <div className="checkout__formItem">
                                <input type="text" id="postalCode" name="postalCode" placeholder="Postal code" className='checkout__inputField'/>
                            </div>
                        </form>
                    </div>
                    <div className="checkout__cart">
                        <h2>Shopping Cart</h2>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
