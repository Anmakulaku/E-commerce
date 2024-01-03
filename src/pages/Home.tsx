import { Header } from '../components/Header'
import { Brand } from '../components/Brand'
import { Footer } from '../components/Footer'
import { Subscribe } from '../components/Subscribe'
import { Gallery } from '../components/Gallery'
import { Slider } from '../components/Slider'

export function Home() {
    return(
        <div>
            <Header />
            <Brand />
            <Slider />
            <Gallery />
            <Subscribe />
            <Footer />
        </div>
    )
}