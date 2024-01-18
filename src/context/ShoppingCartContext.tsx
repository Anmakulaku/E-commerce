import { createContext, useContext, ReactNode, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}
type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    addGiftWrap: () => void;
    isGiftWrapSelected: boolean;
    toggleGiftWrap: () => void;
    cartQuantity: number 
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext ({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext (ShoppingCartContext)
}

export function ShoppingCartProvider ({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shoppingCart", [])
    const [isOpen, setIsOpen] = useState(false)
    const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => {
        if (item.id !== -1) {
            return item.quantity ? item.quantity + quantity : quantity;
        } else {
            return quantity;
        }
    }, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    } 
    function increaseCartQuantity (id: number) {
        setCartItems(currItems=>{
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1}]
            } else {
                return currItems.map (item =>{
                    if (item.id == id) {
                        return {...item, quantity: item.quantity +1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity (id: number) {
        setCartItems(currItems=>{
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map (item =>{
                    if (item.id == id) {
                        return {...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id:number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }
    function addGiftWrap() {
        setCartItems((currItems) => {
            const giftWrapItem: CartItem = {
                id: -1, 
                quantity: 0,
            };

            return [...currItems, giftWrapItem];
        });
    }
    function toggleGiftWrap() {
        setIsGiftWrapSelected((prev) => !prev);
    }
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, addGiftWrap, isGiftWrapSelected, toggleGiftWrap, cartItems, cartQuantity}}>
            {children}
            {isOpen && <ShoppingCart />} 
        </ShoppingCartContext.Provider>
    )
}