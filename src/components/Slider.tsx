import './Slider.css'
import slider1 from "../img/slider1.png"

export function Slider() {
    return(
        <div className='slider section__margin'>
            <div className='slider__grid'>
                <div className='slider__imageBox'>
                    <img src={slider1} alt="Peaky Blinders woman"/>
                    </div>
                <div className='slider__separatorBox'></div>
                <div className='slider__textBox'>
                    <p className='slider__description'>Women Collection</p>
                    <h2 className='slider__title'>Peaky Blinders</h2>
                    <p className='slider__description'>Discover a unique style inspired by the world of Peaky Blinders! White shirt, suspenders, flat cap, stylish trousers - become a member of the Shelby family. Choose elegance and class to create your own distinctive look today! </p>
                    <button className='button slider__btn'> Shop Now </button>
                </div>
            </div>
        </div> 
    )}