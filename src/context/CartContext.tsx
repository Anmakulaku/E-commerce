import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { ShoppingCart } from "../components/ShoppingCart/ShoppingCart";
import { getAllItems } from "../utilities/services/items.service";
import { Product } from "../utilities/types/ProductType";
import { CartItem } from "../utilities/types/CartItemType";

type CartProviderProps = {
    children: ReactNode
}

type CartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number, size: string) => number
    increaseCartQuantity: (id: number, size: string) => void
    decreaseCartQuantity: (id: number, size: string) => void
    removeFromCart: (id: number, size: string) => void
    addGiftWrap: () => void;
    isGiftWrapSelected: boolean;
    totalSumWithGiftWrap: number;
    toggleGiftWrap: () => void;
    totalSum: number;
    cartQuantity: number;
    cartItems: CartItem[];
    products: Product[];
}

export const CartContext = createContext({} as CartContext);

export function useShoppingCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useShoppingCart must be used within a CartProvider");
    }
    return context;
}

// LOCAL STORAGE
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue !== null && jsonValue !== undefined) {
            try {
                return JSON.parse(jsonValue);
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        }
        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [typeof value, typeof setValue];
}

export const GIFT_WRAP_PRICE = 10; // CREAMING_SNAKE_CASE

// SHOPPING CART PROVIDER   
export function CartProvider ({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shoppingCart", [])
    console.log("cartItems in CartProvider:", cartItems);
    const [isOpen, setIsOpen] = useState(false)
    const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);
    const [products, setProducts] = useState<Product[]>([]); 

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce((quantity, item) => {
        if (item.id !== -1) {
            return item.quantity ? item.quantity + quantity : quantity;
        } else {
            return quantity;
        }
    }, 0);

    useEffect(() => {
        getAllItems().then((data) => {
            setProducts(data);
        });
    }, []);

    function getItemQuantity(id: number, size: string) {
        const item = cartItems.find(item => item.id === id && item.size === size);
        return item ? item.quantity : 0;
    }
    
    function increaseCartQuantity(id: number, size: string) {
        // console.log("Increasing quantity for item with id:", id, "and size:", size)
        setCartItems(currItems => {
            const newItem = { id, size, quantity: 1 } as CartItem;
            const existingItemIndex = currItems.findIndex(item => item.id === id && item.size === size);
            if (existingItemIndex !== -1) {
            const updatedItems = [...currItems];
            updatedItems[existingItemIndex].quantity++;
            return updatedItems;
            } else {
            return [...currItems, newItem];
            }
        });
    }
    
    function decreaseCartQuantity(id: number, size: string) {
        // console.log("Decreasing quantity for item with id:", id, "and size:", size);
    setCartItems(currItems => {
        const existingItem = currItems.find(item => item.id === id && item.size === size);
        if (existingItem) {
            if (existingItem.quantity === 1) {
                return currItems.filter(item => !(item.id === id && item.size === size));
            } else {
                return currItems.map(item => {
                    if (item.id === id && item.size === size) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        } else {
            return currItems;
        }
    });
    }

    function removeFromCart(id: number, size: string) {
        // console.log("Removing item with id:", id, "and size:", size);
        setCartItems(currItems => {
            return currItems.filter(item => !(item.id === id && item.size === size));
        });
    }

    function addGiftWrap() {
        console.log("Gift wrap render")
        setCartItems((currItems) => {
            const giftWrapItem = { id: -1, quantity: 0 } as CartItem;
            return [...currItems, giftWrapItem];
        });
    }

    function toggleGiftWrap() {
        setIsGiftWrapSelected((prev) => !prev);
    }

    const totalSum = cartItems.reduce((total, cartItem) => {
        const cartProduct = products.find(product => product.id === cartItem.id); // Użyj produktów w koszyku do obliczenia sumy cen
        return total + (cartProduct?.price || 0) * cartItem.quantity;
    }, 0);
    
    const totalSumWithGiftWrap = isGiftWrapSelected ? totalSum + GIFT_WRAP_PRICE : totalSum;

    return (
        <CartContext.Provider value={{ 
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart, 
            openCart, 
            closeCart, 
            addGiftWrap, 
            isGiftWrapSelected, toggleGiftWrap, 
            cartItems, 
            cartQuantity,
            products,
            totalSum,
            totalSumWithGiftWrap }}>
            {children}
            {isOpen && <ShoppingCart />} 
        </CartContext.Provider>
    )
}