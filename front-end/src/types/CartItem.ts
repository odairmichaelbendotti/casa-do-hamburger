import type { ProductType } from "./Product";

export type CartItemType = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: ProductType;
};

export type CartItemsContextType = {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};
