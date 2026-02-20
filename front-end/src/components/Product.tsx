import { ShoppingBag } from "lucide-react";
import type { ProductProps } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { CartItemContext } from "../contexts/CartItemsContext";

const Product = ({
  id,
  name,
  description,
  price,
  img,
  category,
  setProducts,
}: ProductProps) => {
  const { user } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(CartItemContext);

  const handleDeleteProduct = async (id: string) => {
    try {
      if (!id) {
        console.log("ID não enviado");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log("Erro ao realizar a requisição");
        return;
      }

      getProduct();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-products");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

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

  const newCartItem = async () => {
    try {
      const response = await fetch("http://localhost:3000/create-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        console.log("deu ruim ");
        return;
      }

      getCartItems();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <img
          src={`./${img}`}
          className="h-[83px] w-[100px] md:h-[166px] md:w-[200px]"
        />
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase md:text-lg">{name}</p>
            {user?.admin && (
              <div
                className="flex cursor-pointer items-center rounded-md border-1 px-1 text-xs text-red-500 uppercase"
                onClick={() => handleDeleteProduct(id)}
              >
                Deletar
              </div>
            )}
          </div>
          <p className="md:text-md flex-1 text-xs text-[#848484]">
            {description}
          </p>
          <div className="flex items-center justify-end gap-2">
            <p className="text-sm text-[#F2DAAC]">{formatterPrice(price)}</p>
            <ShoppingBag
              size={18}
              className="cursor-pointer"
              onClick={() => newCartItem()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
