import './ShoppingCart.css';



export function ShoppingCart() {
    return (
        <div className="shoppingCart">
        <div className='shoppingCart__content'>
            <div className='shoppingCart__header'>
            <h2>Shopping Cart</h2>
            <button className='shoppingCart__closeButton' >
                &times;
            </button>
            </div>
            <span>Coś w koszyku</span>
        </div>
        </div>
    );
}
