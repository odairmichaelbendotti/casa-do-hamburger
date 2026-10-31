import { createContext } from "react";
import type { CartItemsContextType } from "../types/CartItem";

export const CartItemContext = createContext<CartItemsContextType>({
  cartItems: [],
  setCartItems: () => {},
  getCartItems: async () => {},
});
