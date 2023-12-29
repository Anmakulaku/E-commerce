import { formatCurrency } from "../utilities/formatCurrency";
import './StoreItem.css'

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    img: string;
}

export function StoreItem ({ id, name, price, img}: StoreItemProps) {
    const quantity = 0;
    return (
            <div key={id} className="storeItem__container">
                <div className="storeItem__img">
                    <img src={img} alt="product-image" />
                </div>
                <div className="storeItem__text">
                    <h1 className="storeItem__title">{name}</h1>
                    <span className="storeItem__price">{formatCurrency(price)}</span>
                    <div className="storeItem__btn">
                        {quantity === 0 ? 
                        <button className='button storeItem__btn'> + Add to Cart</button> : null}
                    </div>
                </div>
                {/* <div className="cart-right">
                <p className="cart-price">{calcPrice(quantity, item.price)}.00$</p>
                <IconX onClick={() => removeFromCart(item.id)} />
                </div> */}
            </div>
    );
}
