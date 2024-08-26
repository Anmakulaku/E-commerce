import { Footer } from '../../components/Footer/Footer';
import { Slider } from '../../components/Slider/Slider';
import { Subscribe } from '../../components/Subscribe/Subscribe';
import './ProductPage.css';
import { formatCurrency } from '../../utilities/formatCurrency';
import { useProductPageLogic } from './ProductPageLogic';
import { useParams } from 'react-router-dom';
import ImagesBox from '../../components/ImagesBox/ImagesBox';
import { uuid } from '../../utilities/types/ProductType';

const sizeOrderMap: { [key: string]: number } = {
  xs: 1,
  s: 2,
  m: 3,
  l: 4,
  xl: 5,
  xxl: 6,
};

function sortSizes(sizes: { id: uuid; name: string }[]) {
  return sizes.sort((a, b) => {
    const orderA = sizeOrderMap[a.name.toLowerCase()] || 0;
    const orderB = sizeOrderMap[b.name.toLowerCase()] || 0;
    return orderA - orderB;
  });
}

function renderSizeButtons(
  sizes: { id: uuid; name: string }[],
  selectedSize: string | null,
  handleSizeSelection: (size: string) => void,
) {
  const sortedSizes = sortSizes(sizes);

  if (sizes.length === 1 && sizes[0].name.toLocaleLowerCase() == 'one size') {
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
        {sortedSizes.map(size => (
          <button
            key={size.id}
            className={`productPage__sizeLabelsItem ${selectedSize === size.name && 'selected'}`}
            onClick={() => handleSizeSelection(size.name)}
          >
            {size.name}
          </button>
        ))}
      </div>
    );
  }
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const {
    product,
    selectedSize,
    quantity,
    isSizeSelected,
    handleSizeSelection,
    addToCart,
    decreaseQuantity,
    increaseQuantity,
  } = useProductPageLogic(id || '');

  if (!product) {
    return <div>Brak identyfikatora produktu</div>;
  }

  return (
    <div className='productPage'>
      <div className='productPage__content'>
        <ImagesBox id={product.id} />
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
              product.sizes,
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
