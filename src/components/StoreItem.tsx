import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utilities/formatCurrency';
import { getAllItems, Product } from '../utilities/services/items.service';
import './StoreItem.css';

export function StoreItem({ id, name, price, img }: Product) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const products = await getAllItems();
            const foundProduct = products.find(product => product.id === id);
            if (foundProduct) {
            setProduct(foundProduct);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
        };

        fetchProduct();
    }, [id]);

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
