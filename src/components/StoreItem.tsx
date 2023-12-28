import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    img: string;
}

export function StoreItem ({ id, name, price, img}: StoreItemProps) {
    return (
        <>
            <div key={id} className="storeItem__container">
                <div className="storeItem__img">
                    <img src={img} alt="product-image" />
                </div>
                <div className="storeItem__text">
                    <span className="storeItem__title">{name}</span>
                    <span className="storeItem__price">{formatCurrency(price)}</span>
                    {/* <div className="cart-btns">
                        <button onClick={decrease}>-</button>
                        <p className="quantity">{quantity}</p>
                        <button onClick={increase}>+</button>
                    </div> */}
                </div>
                {/* <div className="cart-right">
                <p className="cart-price">{calcPrice(quantity, item.price)}.00$</p>
                <IconX onClick={() => removeFromCart(item.id)} />
                </div> */}
            </div>
        </>
    );
}
