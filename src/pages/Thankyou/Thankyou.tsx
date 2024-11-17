import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import './Thankyou.css';

export function Thankyou() {
  return (
    <div className='thankyou'>
      <div className='thankyou__container'>
        <div className='thankyou__content'>
          <h1 className='thankyou__title'>Thank you for your purchase!</h1>
          <h2>FASCO Team</h2>
          <div className='thankyou__button'>
          <Link to='/' className='button thankyou__btn'>
            <span>Back to HOME</span>
          </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
