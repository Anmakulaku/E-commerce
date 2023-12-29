import { Header } from '../components/Header'
import { Brand } from '../components/Brand'
import { Footer } from '../components/Footer'
import { Subscribe } from '../components/Subscribe'
import { Gallery } from '../components/Gallery'

export function Home() {
    return(
        <div>
            <Header />
            <Brand />
            <Gallery />
            <Subscribe />
            <Footer />
        </div>
    )
}