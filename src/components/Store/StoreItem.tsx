import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';
import './StoreItem.css';
import { useStoreItemLogic } from './StoreItemLogic';

interface StoreItemProps {
    id: number;
    name: string;
    price: number;
    img: string;
}

export default function StoreItem({ id, name, price, img }: StoreItemProps) {
    const { product, isLoading } = useStoreItemLogic(id);

    if (isLoading) {
        return "Loading...";
    }
    if (!product) {
        return "Product not found";
    }

    return (
        <Link to={`/product/${id}`} className="storeItem__container">
        <div className="storeItem__img">
            <img src={img} alt="product-image" />
        </div>
        <div className="storeItem__text">
            <h1 className="storeItem__title">{name}</h1>
            <span className="storeItem__price">{formatCurrency(price)}</span>
        </div>
        </Link>
    );
}
