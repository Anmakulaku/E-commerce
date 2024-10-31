import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import './ImagesBox.css';

interface ImagesProps {
  id: string;
}

const useCart = () => useContext(ProductsContext);

export default function ImagesBox({ id }: ImagesProps) {
  const { products } = useCart();

  // Znajdź produkt na podstawie ID
  const item = products.find(product => product.id === id);

  if (!item) return null;

  const getMainImage = () => {
    return item.images.length > 0 ? item.images[0] : null;
  };

  const getAdditionalImages = () => {
    return item.images.length > 1 ? item.images.slice(1) : [];
  };

  // const getAllImages = () => {
  //   return item.images;
  // };

  const mainImage = getMainImage();
  const additionalImages = getAdditionalImages();
  // const allImages = getAllImages();

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className='imagesBox__images'>
      <div className='imagesBox__content'>
        {/* Główny obraz */}
        {mainImage && (
          <div className='imagesBox__imgMainContainer'>
            <img
              src={`${API_URL}${mainImage.imageUrl}`}
              alt='Main Product  Image'
              className='imagesBox__imgMain'
            />
          </div>
        )}

        {/* Dodatkowe obrazy */}
        {additionalImages.length > 0 && (
          <div className='imagesBox__imgOthers'>
            {additionalImages.map((image, index) => (
              <div key={index} className='imagesBox__imgOtherContainer'>
                <img
                  src={`${API_URL}${image.imageUrl}`}
                  alt={`Additional Image ${index}`}
                  className='imagesBox__imgOther'
                />
              </div>
            ))}
          </div>
        )}

        {/* Wszystkie obrazy */}
        {/* {allImages.map((image, index) => (
          <div key={index} className='imagesBox__imgContainer'>
            <img
              src={`http://localhost:3000${image.imageUrl}`}
              alt={`Image ${index}`}
              width='150px'
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}
