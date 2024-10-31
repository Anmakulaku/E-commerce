import './Slider.css';
import slider1 from '../../assets/slider1.png';
import slider1webp from '../../assets/slider1webp.webp';
import highQualityIcon from '../../assets/highQualityicon.svg';
import warrantyicon from '../../assets/warrantyicon.svg';
import freeShippingicon from '../../assets/freeShippingicon.svg';
import supporticon from '../../assets/supporticon.svg';
import { Link } from 'react-router-dom';

export function Slider() {
  return (
    <div className='slider section__margin'>
      <div className='slider__grid'>
        <div className='slider__imageBox'>
        <picture>
            <source srcSet={slider1webp} type='image/webp' />
            <img 
              src={slider1} 
              alt='Peaky Blinders woman' 
              loading='lazy' 
            />
          </picture>
          <Link to='/store' className='button slider__btn slider__btnMobile'>
            <span>Shop Now</span>
          </Link>
        </div>
        <div className='slider__separatorBox'></div>
        <div className='slider__textBox'>
          <p className='slider__description'>Women Collection</p>
          <h2 className='slider__title'>Peaky Blinders</h2>
          <p className='slider__description'>
            Discover a unique style inspired by the world of Peaky Blinders!
            White shirt, suspenders, flat cap, stylish trousers - become a
            member of the Shelby family. Choose elegance and class to create
            your own distinctive look today!{' '}
          </p>
          <Link to='/store' className='button slider__btn slider__btnElse'>
            <span>Shop Now</span>
          </Link>
        </div>
      </div>
      <div className='features section__margin'>
        <div className='features__content'>
          <div className='features__item'>
            <img src={highQualityIcon} alt='icon' />
            <div className='features__text'>
              <h3 className='features__title'>High Quality</h3>
              <p className='feature__description'>Crafted from top materials</p>
            </div>
          </div>
          <div className='features__item'>
            <img src={warrantyicon} alt='icon' />
            <div className='features__text'>
              <h3 className='features__title'>Warranty Protection</h3>
              <p className='feature__description'>Over 2 years</p>
            </div>
          </div>
          <div className='features__item'>
            <img src={freeShippingicon} alt='icon' />
            <div className='features__text'>
              <h3 className='features__title'>Free Shipping</h3>
              <p className='feature__description'>Order over 150$</p>
            </div>
          </div>
          <div className='features__item'>
            <img src={supporticon} alt='icon' />
            <div className='features__text'>
              <h3 className='features__title'>24/7 Support</h3>
              <p className='feature__description'>Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
