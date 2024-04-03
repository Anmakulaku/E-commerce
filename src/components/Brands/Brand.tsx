import './Brand.css';
import chanel from '../../assets/chanel.png';
import lv from '../../assets/lv.png';
import prada from '../../assets/prada.png';
import ck from '../../assets/ck.png';
import denim from '../../assets/denim.png';

export function Brand() {
  return (
    <div className='brand'>
      <div className='brand__container'>
        <div className='brand__item'>
          <img src={chanel} alt='Chanel' className='brand__img1' />
        </div>
        <div className='brand__item'>
          <img src={lv} alt='Louis Vuitton' className='brand__img2' />
        </div>
        <div className='brand__item'>
          <img src={prada} alt='Prada' className='brand__img3' />
        </div>
        <div className='brand__item'>
          <img src={ck} alt='Calvin Klein' className='brand__img4' />
        </div>
        <div className='brand__item'>
          <img src={denim} alt='Denim' className='brand__img5' />
        </div>
      </div>
    </div>
  );
}
