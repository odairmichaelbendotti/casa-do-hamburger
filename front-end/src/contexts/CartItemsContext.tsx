import { createContext, useState, type ReactNode } from "react";
import type { CartItemType, CartItemsContextType } from "../types/CartItem";

export const CartItemContext = createContext<CartItemsContextType>({
  cartItems: [],
  setCartItems: () => {},
});

export const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  return (
    <CartItemContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartItemContext.Provider>
  );
};
