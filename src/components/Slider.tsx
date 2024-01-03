import './Slider.css'
import slider1 from "../img/slider1.png"

export function Slider() {
    return(
        <div className='slider section__margin'>
            <div className='slider__content'>
                <div className='slider__grid'>
                    <div className='slider__imageBox'></div>
                        <img src={slider1} alt="Peaky Blinders woman"/>
                    <div className='slider__separatorBox'></div>
                    <div className='slider__textBox'></div>
                        <h2>Peaky Blinders</h2>
                        <p>Discover a unique style inspired by the world of Peaky Blinders! Choose elegance and class to create your own distinctive look today!</p>
                        <button className='button slider__btn'> Shop Now </button>
                </div>
            </div>
        </div> 
    )}