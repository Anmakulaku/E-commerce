import { StoreItem } from "../components/StoreItem"
import { Footer } from "../components/Footer"
import storeItems from "../data/itemsAll.json"
import './Store.css'
import { Subscribe } from "../components/Subscribe"
import { Gallery } from "../components/Gallery"
import { Slider } from "../components/Slider"


export function Store() {
    return(
        <div className="store__container">
            <h1 className="store__title">All</h1>
                <div className="store__products">
                    {storeItems
                    .sort(() => Math.random() - 0.5) 
                    .map(item => (
                            <StoreItem key={item.id} {...item} />
                    ))}
                </div>
                <Slider />
                <Gallery />
                <Subscribe />
                <Footer />
        </div>
    )
}