import './Brand.css';
import chanel from '../../assets/chanel.png';
import lv from '../../assets/lv.png';
import prada from '../../assets/prada.png';
import ck from '../../assets/ck.png';
import denim from '../../assets/denim.png';
import chanelwebp from '../../assets/chanelwebp.webp';
import lvwebp from '../../assets/lvwebp.webp';
import pradawebp from '../../assets/pradawebp.webp';
import ckwebp from '../../assets/ckwebp.webp';
import denimwebp from '../../assets/denimwebp.webp';

export function Brand() {
  return (
    <section className='brand'>
      <div className='brand__container'>
        <div className='brand__item'>
          <picture>
            <source srcSet={chanelwebp} type='image/webp' />
            <img src={chanel} alt='Chanel' className='brand__img1' />
          </picture>
        </div>
        <div className='brand__item'>
          <picture>
            <source srcSet={lvwebp} type='image/webp' />
            <img src={lv} alt='Louis Vuitton' className='brand__img2' />
          </picture>
        </div>
        <div className='brand__item'>
          <picture>
            <source srcSet={pradawebp} type='image/webp' />
            <img src={prada} alt='Prada' className='brand__img3' />
          </picture>
        </div>
        <div className='brand__item'>
          <picture>
            <source srcSet={ckwebp} type='image/webp' />
            <img src={ck} alt='Calvin Klein' className='brand__img4' />
          </picture>
        </div>
        <div className='brand__item'>
          <picture>
            <source srcSet={denimwebp} type='image/webp' />
            <img src={denim} alt='Denim' className='brand__img5' />
          </picture>
        </div>
      </div>
    </section>
  );
}
