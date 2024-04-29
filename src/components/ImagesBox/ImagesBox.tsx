import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import './ImagesBox.css'

interface ImagesProps {
  id: number;
  img: string;
  imgOther: string[];
}
const useCart = () => useContext(ProductsContext);

export default function Images({ id, imgOther }: ImagesProps) {
  const { products } = useCart();

  const item = products.find(product => product.id === id);

  if (!item) return null;
  return (
    <div className='imagesBox__images'>
      <div className='imagesBox__content'>
        {/* Główny obraz */}
        <div className='imagesBox__imgMainContainer'>
          <img
            src={`http://localhost:3001/images/${item?.img}`}
            alt='product-image'
            className='imagesBox__imgMain'
          />
        </div>
        {/* Dodatkowe obrazy */}
        <div className='imagesBox__imgOthers'>
          {imgOther &&
            imgOther.map((imgUrl, index) => (
              <div key={index} className='imagesBox__imgOtherContainer'>
                <img
                  src={`http://localhost:3001/images/${imgUrl}`}
                  alt={`Additional Image ${index}`}
                  className='imagesBox__imgOther'
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
