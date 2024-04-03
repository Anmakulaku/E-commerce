import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';
import './StoreItem.css';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';

interface StoreItemProps {
    id: number;
    name: string;
    price: number;
    img: string;
}

const useCart = () =>  useContext(ProductsContext);

export default function StoreItem({ id, name, price, img }: StoreItemProps) {
    const { products } = useCart();

    const item = products.find((product) => product.id === id);

    if (!item) return null;

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
