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
                    <h2 className='productPage__companyName'>FASCO</h2>
                    <span className='productPage__title'>{product.name}</span>
                    <span className='productPage__price'>{product.price}</span>
                </div>
            </div>
        <Slider />
        <Subscribe />
        <Footer />
        </div>
    );
}
