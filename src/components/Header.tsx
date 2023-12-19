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
                    <div id="img1" className="lil-overlay"></div>
                    {/* <img src={header1} alt="img1" /> */}
                </div>
                <div className='header__grid-middle'>
                    <div className="header__grid-2">
                        <div id="img2" className="lil-overlay"></div>
                        {/* <img src={header2} alt="img2" /> */}
                    </div>
                    <div className="header__grid-text">
                        <span>ULTIMATE SALE</span>
                    </div>
                    <div className="header__grid-3">
                        <div id="img3" className="lil-overlay"></div>
                        {/* <img src={header3} alt="img3" /> */}
                    </div>
                </div>
                <div className="header__grid-4">
                    <div id="img4" className="lil-overlay"></div>
                    {/* <img src={header4} alt="img4" /> */}
                </div>
            </div>
            </div>
        </div>
        </>
    )
}