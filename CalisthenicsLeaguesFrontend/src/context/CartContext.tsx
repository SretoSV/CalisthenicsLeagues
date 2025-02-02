import { createContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  numberOfItems: number;
  cartItems: Shirt[];
  updateCartItems: (id: number, leagueName: string, shirtImage: string, size: string, quantity: number, option: number, price: number) => void;
  removeItem: (id: number, leagueName: string, shirtImage: string, size: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

interface Shirt {
  id: number;
  leagueName: string;
  shirtImage: string;
  size: string;
  quantity: number;
  price: number;
}

export function CartProvider({ children }: CartProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(() => {
    const savedItems = localStorage.getItem("cartNumberOfItems");
    return savedItems ? parseInt(savedItems) : 0;
  });

  const [cartItems, setCartItems] = useState<Shirt[]>(() => {
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

  const updateCartItems = (id: number, leagueName: string, shirtImage: string, size: string, quantity: number, option: number, price: number) => {
    const newItem: Shirt = { id, leagueName, shirtImage, size, quantity, price
     };
    if(option === 1){
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === id && item.shirtImage === shirtImage && item.leagueName === leagueName && item.size === size
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
          (item) => item.id === id && item.shirtImage === shirtImage && item.leagueName === leagueName && item.size === size
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

  const removeItem = (id: number, leagueName: string, shirtImage: string, size: string) => {
    setCartItems((prevItems) => {
      const filteredItems = prevItems.filter(
        (item) => !(item.id === id && item.shirtImage === shirtImage && item.leagueName === leagueName && item.size === size)
      );
      const removedItem = prevItems.find(
        (item) => item.id === id && item.shirtImage === shirtImage && item.leagueName === leagueName && item.size === size
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

  useEffect(() => {
    localStorage.setItem("cartNumberOfItems", numberOfItems.toString());
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [numberOfItems, cartItems]);

  return (
    <CartContext.Provider value={{ numberOfItems, updateCartItems, cartItems, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}