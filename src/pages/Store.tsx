import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/itemsAll.json"
import './Store.css'

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
        </div>
    )
}