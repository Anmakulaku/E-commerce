import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/formatCurrency';
import './StoreItem.css';
import { useStoreItemLogic } from './StoreItemLogic';
import { Product } from '../../utilities/services/items.service';

interface StoreItemProps {
  item: Product;
}

export function StoreItemWrapper() {
  const { product, isLoading } = useStoreItemLogic(id);

  if (isLoading) {
    return "Loading...";
  }
  if (!product) {
      return "Product not found";
  }

  return <StoreItem item={product}/>;
}

export default function StoreItem({ item }: StoreItemProps) {
    const handleImgOverMouse = (e: React.MouseEvent<HTMLDivElement>) => {}

    return (
        <Link to={`/product/${id}`} className="storeItem__container">
        <div className="storeItem__img">
            <img src={item.img} alt="product-image" onMouseEnter={handleImgOverMouse} />
        </div>
        <div className="storeItem__text">
            <h1 className="storeItem__title">{item.name}</h1>
            <span className="storeItem__price">{formatCurrency(item.price)}</span>
        </div>
        </Link>
    );
}
