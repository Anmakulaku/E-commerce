import { useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Slider } from '../components/Slider';
import { Subscribe } from '../components/Subscribe';
import './ProductPage.css';
import { formatCurrency } from '../utilities/formatCurrency';
import { useEffect, useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { itemsAll } from '../data/itemsAll';

export function ProductPage() {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    const { id } = useParams<{ id?: string }>();

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [product, setProduct] = useState<{
        id: number;
        gender: string;
        category: string;
        img: string;
        imgOther: string[];
        name: string;
        price: number;
    } | null>(null);

    let productId = -1; 

    if (id) {
        productId = parseInt(id, 10);
    }

    useEffect(() => {
        const fetchData = async () => {
            const foundProduct = itemsAll.find(item => item.id === productId);
    
            if (foundProduct) {
                setProduct(foundProduct);
    
                if (foundProduct.img) {
                    setMainImage(foundProduct.img);
                } else if (foundProduct.imgOther && foundProduct.imgOther.length > 0) {
                    setMainImage(foundProduct.imgOther[0]);
                }
            }
        };

        fetchData();
    }, [id, productId]);

    if (!id || !product) {
        return <div>Brak identyfikatora produktu</div>;
    }

    const quantity = getItemQuantity(product.id);
    const isAccessories = product.category === 'accessories';

    const handleImageClick = (clickedImage: string) => {
        setMainImage(clickedImage);
    };

    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
    };

    return (
        <div className="productPage">
        <div className='productPage__content'>
            <div className='productPage__images'>
            {mainImage && (
                <img src={mainImage} alt={product.name} className="productPage__imgMain" />
            )}
            <div className='productPage__imgOthers'>
                {[product.img, ...product.imgOther].map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={index === 0 ? product.name : `${product.name} - Additional Image ${index}`}
                    onClick={() => handleImageClick(img)}
                    className={img === mainImage ? 'selected' : ''}
                />
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
