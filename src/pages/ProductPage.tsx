import { useParams } from 'react-router-dom';
import storeItems from '../data/itemsAll.json';
import { Footer } from '../components/Footer';
import { Slider } from '../components/Slider';
import { Subscribe } from '../components/Subscribe';
import './ProductPage.css';
import { formatCurrency } from '../utilities/formatCurrency';
import { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';

export function ProductPage() {
    
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
    };

    const { id } = useParams<{ id?: string }>();
    if (!id) {
        return <div>Brak identyfikatora produktu</div>;
    }

    const productId = parseInt(id, 10);
    const product = storeItems.find(item => item.id === productId);
    const quantity = getItemQuantity(productId);

    if (!product) {
        return <div>Produkt nie został znaleziony</div>;
    }
    const isAccessories = product.category === 'accessories';

    return (
        <div className="productPage">
            <div className='productPage__content'>
                <div className='productPage__images'>
                    <img src={product.img} alt={product.name} className='productPage__imgMain'/>
                    <div className='productPage__imgOthers'>
                        {product.imgOther?.map((otherImg, index) => (
                            <img key={index} src={otherImg} alt={`${product.name} - Additional Image ${index + 1}`} />
                        ))}
                    </div>
                </div>
                <div className='productPage__info'>
                    <h2 className='productPage__titleStyle productPage__companyName'>FASCO</h2>
                    <span className='productPage__titleStyle productPage__title'>{product.name}</span>
                    <span className="productPage__titleStyle productPage__price">{formatCurrency(product.price)}</span>
                    <div className= 'productPage__sizeBox'>
                        <span className='productPage__sizeTitle'>Size: {selectedSize && <div className='productPage__sizeSelected'> {selectedSize}</div>}</span>
                        {isAccessories ? (
                            <button className={`productPage__sizeLabelsItem ${selectedSize === 'oneSize' && 'selected'}`} onClick={() => handleSizeSelection('One Size')}>One Size</button>
                        ) : (
                            <div className='productPage__sizeLabels'>
                                <button className={`productPage__sizeLabelsItem ${selectedSize === 'XS' && 'selected'}`} onClick={() => handleSizeSelection('XS')}>XS</button>
                                <button className={`productPage__sizeLabelsItem ${selectedSize === 'S' && 'selected'}`} onClick={() => handleSizeSelection('S')}>S</button>
                                <button className={`productPage__sizeLabelsItem ${selectedSize === 'M' && 'selected'}`} onClick={() => handleSizeSelection('M')}>M</button>
                                <button className={`productPage__sizeLabelsItem ${selectedSize === 'L' && 'selected'}`} onClick={() => handleSizeSelection('L')}>L</button>
                                <button className={`productPage__sizeLabelsItem ${selectedSize === 'XL' && 'selected'}`} onClick={() => handleSizeSelection('XL')}>XL</button>
                                <button className={`productPage__sizeLabelsItem ${selectedSize === 'XXL' && 'selected'}`} onClick={() => handleSizeSelection('XXL')}>XXL</button>
                            </div>
                        )} 
                        
                    <div className="productPage__quantity">
                        <div className='productPage__sizeTitle'> Quantity:</div>
                            <div className='productPage__quantityContent'>
                                <div className='productPage__changeQuantity'>
                                    <button className='button productPage__btn' onClick={() => decreaseCartQuantity(productId)}>-</button>
                                        <span>{quantity}</span>
                                    <button className='button productPage__btn' onClick={() => increaseCartQuantity(productId)}>+</button>
                                </div>
                                    <button className='button productPage__btnAdd' onClick={() => increaseCartQuantity(productId)}>
                                        <span className='productPage__titleStyle'>Add to Cart</span> 
                                    </button> 
                                <button className='button productPage__btnAdd' onClick={() => removeFromCart(productId)}>
                                    <span className='productPage__titleStyle'>Remove</span> 
                                </button> 
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <Slider />
        <Subscribe />
        <Footer />
        </div>
    );
}
