import { X } from "lucide-react";
import Button from "./Button";
import CartItem from "./CartItem";
import { useContext, useEffect } from "react";
import { CartItemContext } from "../contexts/CartItemsContext";
import { formatterPrice } from "../utils/formatterPrice";

type CartTypeProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
};

const Cart = ({ setShowCart, showCart }: CartTypeProps) => {
  // const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { cartItems, setCartItems, getCartItems } = useContext(CartItemContext);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  async function handleCreateOrder() {
    try {
      const response = await fetch("http://localhost:3000/create-order", {
        method: "POST",
        credentials: "include",
      });

      if (cartItems.length === 0) {
        console.log("Carrinho vazio");
        return;
      }

      if (!response.ok) {
        console.log("Erro ao finalizar pedido");
        return;
      }

      setCartItems([]);
      setShowCart(false);
      console.log("Pedido realizado com sucesso");
    } catch (err) {
      console.log(err);
      return;
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="absolute right-0 z-1 flex h-screen w-[375px] flex-col bg-[#F2DAAC] p-5">
      <div className="flex justify-between">
        <X className="cursor-pointer" onClick={() => setShowCart(!showCart)} />
        <p className="font-bold uppercase">Meu carrinho</p>
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-2">
        {cartItems.map((item) => (
          <CartItem
            title={item.product.name}
            price={item.product.price}
            img={item.product.img}
            quantity={item.quantity}
            id={item.product.id}
          />
        ))}
      </div>

      <div className="mt-4 border-t border-[#161410]/20 pt-4">
        <p className="mb-4">Total: {formatterPrice(total)}</p>
        <Button title="Finalizar pedido" onClick={handleCreateOrder} />
      </div>
    </div>
  );
};

export default Cart;
