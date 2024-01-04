import { Footer } from '../components/Footer'
import { Slider } from '../components/Slider'
import { Subscribe } from '../components/Subscribe'
import './ProductPage.css'


export function ProductPage() {
    return(
        <div className='productPage'>
            <h1>ProductPage</h1>
            <Slider />
            <Subscribe />
            <Footer />
        </div>
    )
}