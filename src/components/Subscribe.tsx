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
                    <p className='subscribe__info'>Bądź na bieżąco z najnowszymi rabatami, ekskluzywnymi ofertami i nie przegap żadnych okazji! Zapisz się do naszego newslettera i ciesz się dostępem do wyjątkowych promocji.</p>
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