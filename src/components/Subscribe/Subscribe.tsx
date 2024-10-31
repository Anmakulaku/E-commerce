import './Subscribe.css';
import subscribe1 from '../../assets/subscribe1.png';
import subscribe2 from '../../assets/subscribe2.png';
import subscribe1webp from '../../assets/subscribe1webp.webp';
import subscribe2webp from '../../assets/subscribe2webp.webp';
import { useSubscribeLogic } from './SubscribeLogic';
import SubscribeModal from './SubscribeModal';

export function Subscribe() {
  const {
    email,
    emailError,
    isSubscribed,
    handleInputChange,
    handleSubscribe,
    handleEnterKeyPress,
    onCloseClick,
  } = useSubscribeLogic();

  return (
    <div className='subscribe section__margin'>
      <div className='subscribe__grid'>
        <div className='subscribe__img'>
        <picture>
          <source srcSet={subscribe1webp} type="image/webp" />
          <img src={subscribe1} alt='man photo' className='subscribe__imgMan' loading='lazy'/>
        </picture>
        </div>
        <div className='subscribe__text'>
          <span className='subscribe__title'>Subscribe To Our Newsletter</span>
          <p className='subscribe__info'>
            Stay up-to-date with the latest discounts, exclusive offers, and
            never miss out on any opportunities! Subscribe to our newsletter and
            enjoy access to exclusive promotions.
          </p>
          <div className='subscribe__buttonBox section__margin'>
            <input
              type='email'
              className={`subscribe__inputField ${emailError ? 'invalid' : ''}`}
              placeholder='Enter your email...'
              value={email}
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyPress}
              required
            />
            {emailError && <p className='error-message'>{emailError}</p>}
            <div className='subscribe__btnBg'>
              <button
                className='button subscribe__btn'
                onClick={handleSubscribe}
                disabled={!!emailError}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
        <div className='subscribe__img'>
        <picture>
          <source srcSet={subscribe2webp} type="image/webp" />
          <img
            src={subscribe2}
            alt='woman photo'
            className='subscribe__imgWoman'
            loading='lazy'
          />
        </picture>
        </div>
      </div>
      <SubscribeModal
        isVisible={isSubscribed}
        onCloseClick={onCloseClick}
      />
    </div>
  );
}
