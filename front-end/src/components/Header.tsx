import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";
import Cart from "./Cart";
import { CartItemContext } from "../contexts/CartItemsContext";

const Header = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(CartItemContext);
  const location = useLocation();

  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (response.status !== 200) {
        console.log("deu ruim");
        return;
      }

      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        console.log("nao deu certo");
        return;
      }

      setUser(null);
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

  useEffect(() => {
    handleAuthUser();
    getCartItems();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1";

    if (location.pathname === path) {
      return `${baseClass} text-[#161410] bg-[#F2DAAC]`;
    } else {
      return baseClass;
    }
  };

  let cartQuantity = 0;

  for (let i = 0; i < cartItems.length; i++) {
    cartQuantity += cartItems[i].quantity;
  }

  return (
    <div className="bg-[#161410]">
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-[737px] md:p-0">
        <Link to="/" className="py-2">
          <img src="./logo.png" alt="" />
        </Link>

        {user ? (
          <div className="flex items-center gap-8 text-white">
            {user.admin && (
              <div className="hidden items-center gap-2 text-[#F2DAAC] md:flex">
                <Link to="/">
                  <div className={getNavItemClass("/")}>
                    <Box size={18} />
                  </div>
                </Link>
                <Link to="/pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard size={18} />
                  </div>
                </Link>
                <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                  <Plus size={18} />
                </div>
              </div>
            )}

            <div className="relative cursor-pointer">
              <ShoppingCart size={18} onClick={() => setShowCart(!showCart)} />
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-[#161410]">
                {cartQuantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p>{user.name}</p>
              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={() => handleLogout()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
