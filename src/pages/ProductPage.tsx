import { Footer } from '../components/Footer'
import { Subscribe } from '../components/Subscribe'
import './ProductPage.css'


export function ProductPage() {
    return(
        <div className='productPage'>
            <h1>ProductPage</h1>
            <Subscribe />
            <Footer />
        </div>
    )
}