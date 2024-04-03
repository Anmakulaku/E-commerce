import { ReactNode, createContext, useContext, useState } from 'react';

type CartOverlayContextType = {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
};

export const CartOverlayContext = createContext<CartOverlayContextType>({
    isOpen: false,
    openCart: () => {},
    closeCart: () => {},
});

export const useCartOverlay = () => useContext(CartOverlayContext);

export const CartOverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <CartOverlayContext.Provider value={{ isOpen, openCart, closeCart }}>
            {children}
        </CartOverlayContext.Provider>
    );
};
