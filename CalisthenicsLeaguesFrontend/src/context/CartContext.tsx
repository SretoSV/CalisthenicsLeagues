import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { ShirtContext } from '../types/ShirtTypes';

interface CartContextType {
  numberOfItems: number;
  cartItems: ShirtContext[];
  updateCartItems: (id: number, league: string, shirtImage: string, size: string, quantity: number, option: number, price: number) => void;
  removeItem: (id: number, league: string, shirtImage: string, size: string) => void;
  emptyCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(() => {
    const savedItems = localStorage.getItem("cartNumberOfItems");
    return savedItems ? parseInt(savedItems) : 0;
  });

  const [cartItems, setCartItems] = useState<ShirtContext[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const increment = () => {
    setNumberOfItems((current) => {
      const updatedItems = current + 1;
      localStorage.setItem("cartNumberOfItems", updatedItems.toString());
      return updatedItems;
    });
  };

  const updateCartItems = (id: number, league: string, shirtImage: string, size: string, quantity: number, option: number, price: number) => {
    const newItem: ShirtContext = { id, league, shirtImage, size, quantity, price };
    if(option === 1){
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === id && item.shirtImage === shirtImage && item.league === league && item.size === size
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        }

        increment();
        return [...prevItems, newItem];
      });
    }
    else{
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === id && item.shirtImage === shirtImage && item.league === league && item.size === size
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity = quantity;
          return updatedItems;
        }

        return [...prevItems, newItem];
      });
    }
  };

  const removeItem = (id: number, league: string, shirtImage: string, size: string) => {
    setCartItems((prevItems) => {
      const filteredItems = prevItems.filter(
        (item) => !(item.id === id && item.shirtImage === shirtImage && item.league === league && item.size === size)
      );
      const removedItem = prevItems.find(
        (item) => item.id === id && item.shirtImage === shirtImage && item.league === league && item.size === size
      );

      if (removedItem) {
        setNumberOfItems((current) => {
          const updatedItems = current - 1;
          localStorage.setItem("cartNumberOfItems", updatedItems.toString());
          return updatedItems;
        });
      }

      return filteredItems;
    });
  };

  const emptyCart = () => {
    setCartItems([]);
    setNumberOfItems(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartNumberOfItems");
  };

  useEffect(() => {
    localStorage.setItem("cartNumberOfItems", numberOfItems.toString());
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [numberOfItems, cartItems]);

  return (
    <CartContext.Provider value={{ numberOfItems, updateCartItems, cartItems, removeItem, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider.");
  }
  return context;
};