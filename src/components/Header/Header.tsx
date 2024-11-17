import './Header.css';
import header1 from '../../assets/header1.png';
import header2 from '../../assets/header2.png';
import header3 from '../../assets/header3.jpg';
import header4 from '../../assets/header4.png';
import header1webp from '../../assets/header1webp.webp';
import header2webp from '../../assets/header2webp.webp';
import header3webp from '../../assets/header3webp.webp';
import header4webp from '../../assets/header4webp.webp';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Header() {
  useEffect(() => {
    const preloadImages = [header1, header2, header3, header4];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src; 
    });
  }, []);
  
  return (
    <>
      <header className='header'>
        <div className='header__container'>
          <div className='header__grid'>
            <div className='header__grid-1 header__img-big'>
              <picture>
                <source srcSet={header1webp} type='image/webp' />
                <img src={header1} alt='img Man On Box' className='img1'/>
              </picture>
            </div>
            <div className='header__grid-middle'>
              <div className='header__grid-2 header__img-small'>
                <picture>
                  <source srcSet={header2webp} type='image/webp' />
                  <img
                    src={header2}
                    alt='img Four Women'
                    className='img2'
                  />
                </picture>
              </div>
              <div className='header__grid-text'>
                <span className='text1'>ULTIMATE</span>
                <span className='text2'>SALE</span>
                <span className='text3'>NEW COLLECTION</span>
                <Link to='/store' className='button header__btn'>
                  <span>SHOP NOW</span>
                </Link>
              </div>
              <div className='header__grid-3 header__img-small'>
                <picture>
                  <source srcSet={header3webp} type='image/webp' />
                  <img
                    src={header3}
                    alt='img Two Smiling Women'
                    className='img3'
                  />
                </picture>
              </div>
            </div>
            <div className='header__grid-4 header__img-big'>
              <picture>
                <source srcSet={header4webp} type='image/webp' />
                <img src={header4} alt='img Man On Chair' className='img4'/>
              </picture>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
