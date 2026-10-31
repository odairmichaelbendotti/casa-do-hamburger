import { useState, type ReactNode } from "react";
import type { CartItemType } from "../types/CartItem";
import { CartItemContext } from "./CartItemsContext";

export const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const getCartItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-cart-items", {
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Erro ao realizar a requisição");
        return;
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <CartItemContext.Provider value={{ cartItems, setCartItems, getCartItems }}>
      {children}
    </CartItemContext.Provider>
  );
};
