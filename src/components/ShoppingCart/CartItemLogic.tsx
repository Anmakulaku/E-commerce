import { useEffect, useState } from "react";
import { Product, getItemById } from "../../utilities/services/items.service";

export function useCartItemLogic(id: number) {
    const [item, setItem] = useState<Product | null>(null);

    useEffect(() => {
        console.log('useCartItemLogic render with id:', id);
        getItemById(id)
            .then(item => {
                setItem(item);
            })
            .catch(error => {
                console.error('Error fetching item:', error);
            });
    }, [id]);

    return item;
}
