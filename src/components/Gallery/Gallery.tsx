import './Gallery.css';
import gallery1 from '../../assets/gallery1.png';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.png';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.png';
import gallery6 from '../../assets/gallery6.png';
import gallery7 from '../../assets/gallery7.png';
import gallery1webp from '../../assets/gallery1webp.webp';
import gallery2webp from '../../assets/gallery2webp.webp';
import gallery3webp from '../../assets/gallery3webp.webp';
import gallery4webp from '../../assets/gallery4webp.webp';
import gallery5webp from '../../assets/gallery5webp.webp';
import gallery6webp from '../../assets/gallery6webp.webp';
import gallery7webp from '../../assets/gallery7webp.webp';

export function Gallery() {
  return (
    <div className='gallery section__margin'>
      <span className='gallery__title'> Follow Us On Instagram</span>
      <p className='gallery__text'>
        Join our Instagram community! Share your fashion moments, tag your
        photos with the hashtag <span>#FascoStars</span>, follow our profile
        @FascoStars, and be a part of the fashion world! Join our followers and
        share your stylish inspirations!
      </p>
      <div className='gallery__box'>
      <picture>
          <source srcSet={gallery1webp} type='image/webp' />
          <img src={gallery1} alt='man in coat' className='gallery__small' loading='lazy' />
        </picture>
        <picture>
          <source srcSet={gallery2webp} type='image/webp' />
          <img src={gallery2} alt='woman in turtleneck' className='gallery__big' loading='lazy' />
        </picture>
        <picture>
          <source srcSet={gallery3webp} type='image/webp' />
          <img src={gallery3} alt='woman in shorts' className='gallery__small' loading='lazy' />
        </picture>
        <picture>
          <source srcSet={gallery4webp} type='image/webp' />
          <img src={gallery4} alt='man in red trousers' className='gallery__big' loading='lazy' />
        </picture>
        <picture>
          <source srcSet={gallery5webp} type='image/webp' />
          <img src={gallery5} alt='woman in blue dress' className='gallery__small' loading='lazy' />
        </picture>
        <picture>
          <source srcSet={gallery6webp} type='image/webp' />
          <img src={gallery6} alt='man in a jacket' className='gallery__big' loading='lazy' />
        </picture>
        <picture>
          <source srcSet={gallery7webp} type='image/webp' />
          <img src={gallery7} alt='woman in pink dress' className='gallery__small gallery7' loading='lazy' />
        </picture>
      </div>
    </div>
  );
}
