import { Footer } from '../../components/Footer/Footer';
import { Slider } from '../../components/Slider/Slider';
import { Subscribe } from '../../components/Subscribe/Subscribe';
import './ProductPage.css';
import { formatCurrency } from '../../utilities/formatCurrency';
import { useProductPageLogic } from './ProductPageLogic';
import { useParams } from 'react-router-dom';

function renderSizeButtons(
  isAccessories: boolean,
  selectedSize: string | null,
  handleSizeSelection: (size: string) => void,
) {
  if (isAccessories) {
    return (
      <button
        className={`productPage__sizeLabelsItem ${selectedSize === 'oneSize' && 'selected'}`}
        onClick={() => handleSizeSelection('One Size')}
      >
        One Size
      </button>
    );
  } else {
    return (
      <div className='productPage__sizeLabels'>
        <button
          className={`productPage__sizeLabelsItem ${selectedSize === 'XS' && 'selected'}`}
          onClick={() => handleSizeSelection('XS')}
        >
          XS
        </button>
        <button
          className={`productPage__sizeLabelsItem ${selectedSize === 'S' && 'selected'}`}
          onClick={() => handleSizeSelection('S')}
        >
          S
        </button>
        <button
          className={`productPage__sizeLabelsItem ${selectedSize === 'M' && 'selected'}`}
          onClick={() => handleSizeSelection('M')}
        >
          M
        </button>
        <button
          className={`productPage__sizeLabelsItem ${selectedSize === 'L' && 'selected'}`}
          onClick={() => handleSizeSelection('L')}
        >
          L
        </button>
        <button
          className={`productPage__sizeLabelsItem ${selectedSize === 'XL' && 'selected'}`}
          onClick={() => handleSizeSelection('XL')}
        >
          XL
        </button>
        <button
          className={`productPage__sizeLabelsItem ${selectedSize === 'XXL' && 'selected'}`}
          onClick={() => handleSizeSelection('XXL')}
        >
          XXL
        </button>
      </div>
    );
  }
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const {
    product,
    mainImage,
    selectedSize,
    quantity,
    isSizeSelected,
    handleSizeSelection,
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    renderImages,
  } = useProductPageLogic(id || '');

  // console.log('ProductPage render');

  if (!product) {
    return <div>Brak identyfikatora produktu</div>;
  }

  const isAccessories = product.category === 'accessories';

  return (
    <div className='productPage'>
      <div className='productPage__content'>
        <div className='productPage__images'>
          {renderImages(mainImage, product)}
        </div>
        <div className='productPage__info'>
          <h2 className='productPage__titleStyle productPage__companyName'>
            FASCO
          </h2>
          <span className='productPage__titleStyle productPage__title'>
            {product.name}
          </span>
          <span className='productPage__titleStyle productPage__price'>
            {formatCurrency(product.price)}
          </span>
          <div className='productPage__sizeBox'>
            <span className='productPage__sizeTitle'>
              Size:{' '}
              {selectedSize && (
                <div className='productPage__sizeSelected'> {selectedSize}</div>
              )}
            </span>
            {renderSizeButtons(
              isAccessories,
              selectedSize,
              handleSizeSelection,
            )}
            {isSizeSelected && (
              <p className='productPage__sizeError'>Please, select your size</p>
            )}
            <div className='productPage__quantity'>
              <div className='productPage__sizeTitle'> Quantity:</div>
              <div className='productPage__quantityContent'>
                <div className='productPage__changeQuantity'>
                  <button
                    className='button productPage__btn'
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className='button productPage__btn'
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className='button productPage__btnAdd'
                  onClick={addToCart}
                >
                  <span className='productPage__titleStyle'>Add to Cart</span>
                </button>
                {/* <button className='button productPage__btnAdd' onClick={() => selectedSize && removeFromCart(product.id, selectedSize)}>
                                    <span className='productPage__titleStyle'>Remove</span> 
                                </button> */}
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
