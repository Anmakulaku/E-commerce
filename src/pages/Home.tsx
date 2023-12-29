import { Header } from '../components/Header'
import { Brand } from '../components/Brand'
import { Footer } from '../components/Footer'
import { Subscribe } from '../components/Subscribe'

export function Home() {
    return(
        <div>
            <Header />
            <Brand />
            <Subscribe />
            <Footer />
        </div>
    )
}