import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/itemsAll.json"

export function Store() {
    return(
        <div className="store__container">
            <h1>Store</h1>
                <div className="store__products">
                    {storeItems.map(item => (
                        <div className="store__itemCard" key={item.id}>
                            <StoreItem {...item} />
                        </div>
                    ))}
                </div>
        </div>
    )
}