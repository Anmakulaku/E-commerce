import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Product } from "../../utilities/types/ProductType";

export function useCartItemLogic(id: number) {
    const { products } = useContext(CartContext);
    const [item, setItem] = useState<Product | null>(null);

    useEffect(() => {
        console.log('useCartItemLogic render with id:', id);
        const foundItem = products.find(product => product.id === id);
        if (foundItem) {
            setItem(foundItem);
        } else {
            console.error('Item not found');
        }
    }, [id, products]);

    return item;
}
