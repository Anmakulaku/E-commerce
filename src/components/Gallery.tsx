import './Gallery.css'
import gallery1 from "../img/gallery1.png"
import gallery2 from "../img/gallery2.jpg"
import gallery3 from "../img/gallery3.png"
import gallery4 from "../img/gallery4.jpg"
import gallery5 from "../img/gallery5.png"
import gallery6 from "../img/gallery6.png"
import gallery7 from "../img/gallery7.png"

export function Gallery() {
    return(
        <div className='gallery section__margin'>
            <span className='gallery__title'> Follow Us On Instagram</span>
            <p className='gallery__text'>Join our Instagram community! Share your fashion moments, tag your photos with the hashtag <span>#FascoStars</span>, follow our profile @FascoStars, and be a part of the fashion world! Join our followers and share your stylish inspirations!</p>
            <div className='gallery__box'>
                <img src={gallery1} alt="man in coat" className='gallery__small'/>
                <img src={gallery2} alt="woman in turtleneck" className='gallery__big'/>
                <img src={gallery3} alt="woman in shorts" className='gallery__small'/>
                <img src={gallery4} alt="man in red trousers" className='gallery__big'/>
                <img src={gallery5} alt="woman in blue dress" className='gallery__small'/>
                <img src={gallery6} alt="man in a jacket" className='gallery__big '/>
                <img src={gallery7} alt="woman in pink dress" className='gallery__small gallery7'/>
            </div>
        </div>
)}