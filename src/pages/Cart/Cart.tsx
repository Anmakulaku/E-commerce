import "./Cart.css"

export function Cart() {

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
                    </div>
                </div>
            </div>
        </div>
    );
}
