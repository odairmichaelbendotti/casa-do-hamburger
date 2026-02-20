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
  return (
    <div className="flex items-center gap-3">
      <img src={`./${img}`} alt="" className="w-[100px] rounded-md" />

      <div className="flex-1">
        <p className="text-sm font-bold uppercase">{title}</p>
        <p className="text-sm font-bold text-[#848484]">
          {formatterPrice(price)}
        </p>
        <div className="mt-1 flex items-center gap-4">
          <ChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={25}
          />
          <p className="text-sm font-bold">{quantity}</p>
          <ChevronLeft
            className="rotate-180 cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={25}
          />
        </div>
      </div>

      <Trash size={18} className="cursor-pointer" onClick={() => alert(id)} />
    </div>
  );
};
export default CartItem;
