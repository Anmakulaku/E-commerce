import { useEffect, useState } from "react";
import { Product, getAllItems } from "../../utilities/services/items.service";

// export function useStoreItemLogic(productId: number){
//     const [product, setProduct] = useState<Product | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchProduct = async () => {
//         try {
//             const products = await getAllItems();
//             const foundProduct = products.find(product => product.id === productId);
//             if (foundProduct) {
//             setProduct(foundProduct);
//             }
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching product:', error);
//         }
//         };

//         fetchProduct();
//     }, [productId]);

//     return { product, isLoading };
// }

export async function fetchProduct(productId: number): Promise<Product | null> {
    try {
        const products = await getAllItems();
        const foundProduct = products.find(product => product.id === productId);
        return foundProduct || null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export function useStoreItemLogic(productId: number, fetchProductFn: (productId: number) => Promise<Product | null> = fetchProduct){
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const foundProduct = await fetchProductFn(productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [productId, fetchProductFn]);

    return { product, isLoading };
}
