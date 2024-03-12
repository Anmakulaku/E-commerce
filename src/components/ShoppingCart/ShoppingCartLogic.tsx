import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Product } from "../../utilities/services/items.service";
import { itemsAll } from "../../_mocks_/itemsAll";

export function useShoppingCartLogic() {
    const { cartItems, isGiftWrapSelected } = useShoppingCart();
    const [cartProducts, setCartProducts] = useState<Product[]>([]); 
    const giftWrapPrice = 10;

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const cartProductIds = cartItems.map(item => item.id); // Pobierz identyfikatory produktów w koszyku
                const productsInCart = itemsAll.filter(item => cartProductIds.includes(item.id)); // Wybierz tylko te produkty, które są w koszyku
                setCartProducts(productsInCart);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, [cartItems]);

    const totalSum = cartItems.reduce((total, cartItem) => {
        const cartProduct = cartProducts.find(product => product.id === cartItem.id); // Użyj produktów w koszyku do obliczenia sumy cen
        return total + (cartProduct?.price || 0) * cartItem.quantity;
    }, 0);
    
    const totalSumWithGiftWrap = isGiftWrapSelected ? totalSum + giftWrapPrice : totalSum;

    return { cartProducts, totalSum, totalSumWithGiftWrap };
}
