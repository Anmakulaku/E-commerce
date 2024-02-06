import './Header.css'
import header1 from '../assets/header1.png'
import header2 from '../assets/header2.png'
import header3 from '../assets/header3.jpg'
import header4 from '../assets/header4.png'
import { Link } from 'react-router-dom'

export function Header() {

    return(
        <>
        <div className="header">
            <div className="header__container">
            <div className="header__grid">
                <div className="header__grid-1 header__img-big">
                    <img src={header1} alt="img1" className='img1' />
                </div>
                <div className='header__grid-middle'>
                    <div className="header__grid-2 header__img-small">
                        <img src={header2} alt="img2" className='img2'/>
                    </div>
                    <div className="header__grid-text">
                        <span className='text1'>ULTIMATE</span>
                        <span className='text2'>SALE</span>
                        <span className='text3'>NEW COLLECTION</span>
                        <Link to="/store" className="button header__btn"><span>SHOP NOW</span></Link>
                    </div>
                    <div className="header__grid-3 header__img-small">
                        <img src={header3} alt="img3" className='img3'/>
                    </div>
                </div>
                <div className="header__grid-4 header__img-big">
                    <img src={header4} alt="img4" className='img4' />
                </div>
            </div>
            </div>
        </div>
        </>
    )
}