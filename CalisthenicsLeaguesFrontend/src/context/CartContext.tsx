import { createContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  numberOfItems: number;
  increment: (items: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? parseInt(savedItems) : 0;
  });

  const increment = (items: number) => {

    setNumberOfItems((current) => {
      const updatedItems = current + items;
      localStorage.setItem("cartItems", updatedItems.toString());
      return updatedItems;
    });

  };

  useEffect(() => {
    localStorage.setItem("cartItems", numberOfItems.toString());
  }, [numberOfItems]);

  return (
    <CartContext.Provider value={{ numberOfItems, increment }}>
      {children}
    </CartContext.Provider>
  );
}