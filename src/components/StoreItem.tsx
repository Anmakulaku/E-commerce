import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom"
import './StoreItem.css'

export type StoreItemProps = {
    id: number | string;
    name: string;
    price: number;
    img: string;
    imgOther?: string[];
};

export function StoreItem ({ id, name, price, img}: StoreItemProps) {
    return (
            <Link to={`/product/${id}`} key={id} className="storeItem__container">
                <div className="storeItem__img">
                    <img src={img} alt="product-image" />
                </div>
                <div className="storeItem__text">
                    <h1 className="storeItem__title">{name}</h1>
                    <span className="storeItem__price">{formatCurrency(price)}</span>
                </div>
            </Link>
    )
}
