import { useParams } from 'react-router-dom';
import storeItems from '../data/itemsAll.json';
import { Footer } from '../components/Footer';
import { Slider } from '../components/Slider';
import { Subscribe } from '../components/Subscribe';
import './ProductPage.css';

export function ProductPage() {
    const { id } = useParams<{ id?: string }>();
    if (!id) {
        return <div>Brak identyfikatora produktu</div>;
    }

    const productId = parseInt(id, 10);

    const product = storeItems.find(item => item.id === productId);

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
                    <span className='productPage__titleStyle productPage__price'>{product.price}</span>
                    <div className='productPage__titleStyle productPage__sizeBox'>
                        <span className='productPage__titleStyle productPage__sizeTitle'>Size:</span>
                    {isAccessories ? 'One Size' : (
                        <div className='productPage__sizeLabels'>
                            <label>
                            <input type="radio" name="size" value="XS" /> XS
                            </label>
                            <label>
                            <input type="radio" name="size" value="S" /> S
                            </label>
                            <label>
                            <input type="radio" name="size" value="M" /> M
                            </label>
                            <label>
                            <input type="radio" name="size" value="L" /> L
                            </label>
                            <label>
                            <input type="radio" name="size" value="XL" /> XL
                            </label>
                            <label>
                            <input type="radio" name="size" value="XXL" /> XXL
                            </label>
                        </div>
                    )}    
                    </div>
                </div>
            </div>
        <Slider />
        <Subscribe />
        <Footer />
        </div>
    );
}
