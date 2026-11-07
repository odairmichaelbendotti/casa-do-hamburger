import { ChevronLeft, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatterPrice";
import { useContext } from "react";
import { CartItemContext } from "../contexts/CartItemsContext";

type CartItemType = {
  title: string;
  price: number;
  img: string;
  id: string;
  quantity: number;
};

const CartItem = ({ title, price, img, id, quantity }: CartItemType) => {
  const { getCartItems } = useContext(CartItemContext);

  const handleIncrease = async () => {
    try {
      const response = await fetch("http://localhost:3000/create-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        console.log("Erro ao aumentar quantidade");
        return;
      }

      await getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async () => {
    try {
      const response = await fetch("http://localhost:3000/decrease-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        console.log("Erro ao diminuir quantidade");
        return;
      }

      await getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/delete-cart-item/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro ao remover o item do carrinho");
        return;
      }
      await getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ price, quantity });

  return (
    <div className="flex items-center gap-3">
      <img src={`./${img}`} alt="" className="w-[100px] rounded-md" />

      <div className="flex-1">
        <p className="text-xs leading-4 font-bold uppercase">{title}</p>
        <p className="text-[11px] leading-3.5 font-bold text-[#848484]">
          Unitário: {formatterPrice(price)}
        </p>
        <p className="text-xs leading-3.5 font-bold">
          Total: {formatterPrice(price * quantity)}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0E] p-0.5 text-white"
            size={18}
            onClick={handleDecrease}
          />
          <p className="text-xs leading-4 font-bold">{quantity}</p>
          <ChevronLeft
            className="rotate-180 cursor-pointer rounded-md bg-[#C92A0E] p-0.5 text-white"
            size={18}
            onClick={handleIncrease}
          />
        </div>
      </div>

      <Trash size={18} className="cursor-pointer" onClick={handleRemove} />
    </div>
  );
};
export default CartItem;
