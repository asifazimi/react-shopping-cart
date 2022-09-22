import React, { createContext, ReactNode, useState, useContext } from "react";

type ShoppingCartProividerProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeCartForm: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const AppContext = ({ children }: ShoppingCartProividerProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // getItemQuantity function
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // increaseCartQuantity function
  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      // If item doesn't exist
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
        // If item exists
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // decreaseCartQuantity function
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      // If item doesn't exist
      if (currentItems.find((item) => item.id === id)?.quantity == 1) {
        return currentItems.filter((item) => item.id !== id);
        // If item exists
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // removeCartForm function
  function removeCartForm(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartForm,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
