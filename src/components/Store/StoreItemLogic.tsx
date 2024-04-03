import { useContext, useEffect, useState } from "react";
import { Product } from "../../utilities/types/ProductType";
import { CartContext } from "../../context/CartContext";

export function useStoreItemLogic(productId: number){
    const { products } = useContext(CartContext);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const foundProduct = products.find(product => product.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [productId, products]);

    return { product, isLoading };
}

