import React, { createContext, useState, useEffect, ReactNode } from 'react';

//Tip korisnika
interface User {
  username: string; //
  surname: string; //
  name: string;//
  instagram: string;
  image: string;//
  id: number;//
  email: string;//
  dateOfBirth: string;
  country: string;//
  league: number;//
}

//Tipovi za context
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  //Pri pokretanju aplikacije povratimo korisnika iz localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cartNumberOfItems');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}