import './Subscribe.css'
import subscribe1 from '../img/subscribe1.png'
import subscribe2 from '../img/subscribe2.png'

export function Subscribe() {
    return(
        <div className='subscribe section__margin'>
            <div className='subscribe__grid'>
                <div className='subscribe__img'>
                    <img src={subscribe1} alt="man photo" />
                </div>
                <div className='subscribe__text'>
                    <span className='subscribe__title'>Subscribe To Our Newsletter</span>
                    <p className='subscribe__info'>Stay up-to-date with the latest discounts, exclusive offers, and never miss out on any opportunities! Subscribe to our newsletter and enjoy access to exclusive promotions.</p>
                    <div className='subscribe__buttonBox section__margin'>
                        <input className='subscribe__inputField' placeholder='Enter your name...'/>
                        <div className='subscribe__btnBg'>
                        <button className='button subscribe__btn'> Subscribe Now </button>
                        </div>
                    </div>
                </div>
                <div className='subscribe__img'>
                    <img src={subscribe2} alt="woman photo" />
                </div>
            </div>
        </div>
    )
}