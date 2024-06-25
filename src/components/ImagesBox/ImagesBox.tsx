import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import './ImagesBox.css';

interface ImagesProps {
  id: number;
}
const useCart = () => useContext(ProductsContext);

export default function Images({ id }: ImagesProps) {
  const { products } = useCart();

  const item = products.find(product => product.id === id);

  if (!item) return null;

  // Podział ciągu imgOther na tablicę
  const imgOtherArray = item.imgOther ? item.imgOther.split(', ') : [];

  return (
    <div className='imagesBox__images'>
      <div className='imagesBox__content'>
        {/* Główny obraz  */}
        <div className='imagesBox__imgMainContainer'>
          <img
            src={`http://localhost:3000${item.image_url}`}
            alt='product-image'
            className='imagesBox__imgMain'
          />
        </div>
        {/* Dodatkowe obrazy */}
        <div className='imagesBox__imgOthers'>
          {imgOtherArray.map((imgOther, index) => (
            <div key={index} className='imagesBox__imgOtherContainer'>
              {imgOther && (
                <img
                  src={`http://localhost:3000${imgOther}`}
                  alt={`Additional Image ${index}`}
                  className='imagesBox__imgOther'
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
