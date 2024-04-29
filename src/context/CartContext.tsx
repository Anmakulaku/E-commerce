import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart';
import { CartItem } from '../utilities/types/CartItemType';
import { useProducts } from './ProductContext';
import { useCartOverlay } from './OverlayContext';

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  state: {
    isGiftWrapSelected: boolean;
    cartItems: CartItem[];
    selectedSize: string | null;
    quantity: number;
  };
  actions: {
    getItemQuantity: (id: number, size: string) => number;
    increaseCartQuantity: (id: number, size: string) => void;
    decreaseCartQuantity: (id: number, size: string) => void;
    removeFromCart: (id: number, size: string) => void;
    addGiftWrap: () => void;
    toggleGiftWrap: () => void;
    setSelectedSize: React.Dispatch<React.SetStateAction<string | null>>;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
  };
  meta: {
    totalSumWithGiftWrap: number;
    totalSum: number;
    cartQuantity: number;
  };
};

export const GIFT_WRAP_PRICE = 5000;

//CART CONTEXT
export const CartContext = createContext<CartContext | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a CartProvider');
  }
  return context;
};

// LOCAL STORAGE
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null && jsonValue !== undefined) {
      try {
        return JSON.parse(jsonValue);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
      }
    }
    if (typeof initialValue === 'function') {
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

//CART PROVIDER
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shoppingCart',
    [],
  );
  const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { products } = useProducts();
  const { isOpen } = useCartOverlay();

  function getItemQuantity(id: number, size: string) {
    const item = cartItems.find(item => item.id === id && item.size === size);
    return item ? item.quantity : 0;
  }

  function increaseCartQuantity(id: number, size: string) {
    setCartItems(currItems => {
      const newItem = { id, size, quantity: 1 } as CartItem;
      const existingItemIndex = currItems.findIndex(
        item => item.id === id && item.size === size,
      );
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
    const existingItem = cartItems.find(
      item => item.id === id && item.size === size,
    );
    if (!existingItem) return;

    const updatedItems =
      existingItem.quantity === 1
        ? cartItems.filter(item => !(item.id === id && item.size === size))
        : cartItems.map(item =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );

    setCartItems(updatedItems);
  }

  function removeFromCart(id: number, size: string) {
    setCartItems(currItems => {
      return currItems.filter(item => !(item.id === id && item.size === size));
    });
  }

  function addGiftWrap() {
    setIsGiftWrapSelected(true);
  }

  function toggleGiftWrap() {
    setIsGiftWrapSelected(prev => !prev);
  }

  const totalSum = cartItems.reduce((total, cartItem) => {
    const cartProduct = products.find(product => product.id === cartItem.id);
    return total + (cartProduct?.price || 0) * cartItem.quantity;
  }, 0);

  const totalSumWithGiftWrap = isGiftWrapSelected
    ? totalSum + GIFT_WRAP_PRICE
    : totalSum;

  return (
    <CartContext.Provider
      value={{
        state: {
          isGiftWrapSelected,
          cartItems,
          selectedSize,
          quantity,
        },
        actions: {
          getItemQuantity,
          increaseCartQuantity,
          decreaseCartQuantity,
          removeFromCart,
          addGiftWrap,
          toggleGiftWrap,
          setSelectedSize,
          setQuantity,
        },
        meta: {
          totalSumWithGiftWrap,
          totalSum,
          cartQuantity: cartItems.length,
        },
      }}
    >
      {children}
      {isOpen && <ShoppingCart />}
    </CartContext.Provider>
  );
};
