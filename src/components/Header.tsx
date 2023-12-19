import './Header.css'
import header1 from '../img/header1.png'
import header2 from '../img/header2.png'
import header3 from '../img/header3.jpg'
import header4 from '../img/header4.png'

export function Header() {

    return(
        <>
        <div className="header">
            <div className="header__container">
            <div className="header__grid">
                <div className="header__grid-1">
                    <div className="header__img-big">
                        <img src={header1} alt="img1" className='img1' />
                    </div>
                </div>
                <div className='header__grid-middle'>
                    <div className="header__grid-2">
                        <div id="img2" className="header__img-small">
                            <img src={header2} alt="img2" className='img2'/>
                        </div>
                    </div>
                    <div className="header__grid-text">
                        <span>ULTIMATE SALE</span>
                    </div>
                    <div className="header__grid-3">
                        <div id="img3" className="header__img-small">
                            <img src={header3} alt="img3" className='img3'/>
                        </div>
                    </div>
                </div>
                <div className="header__grid-4">
                    <div className="header__img-big">
                        <img src={header4} alt="img4" className='img4' />
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}