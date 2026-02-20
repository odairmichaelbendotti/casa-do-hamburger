import { useEffect, useState } from "react";
import Product from "../components/Product";
import type { ProductType } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("Hamburger");
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const elementoSelecionado =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border-1 border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] md:h-9 md:w-32";
    const elementoNaoSelecionado =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border-1 border-[#F2DAAC] bg-[#161410] text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:h-9 md:w-32";

    if (category === categoryName) {
      return elementoSelecionado;
    } else {
      return elementoNaoSelecionado;
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

  const filteredProduct = products.filter((product) => {
    return product.category === category;
  });

  console.log(filteredProduct);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="mx-auto w-full px-3 text-white md:w-[737px] md:px-0">
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Hamburger")}
          onClick={() => handleChangeCategory("Hamburger")}
        >
          Hamburger
        </div>
        <div
          className={getCategoryClass("Bebida")}
          onClick={() => handleChangeCategory("Bebida")}
        >
          Bebida
        </div>
        <div
          className={getCategoryClass("Porção")}
          onClick={() => handleChangeCategory("Porção")}
        >
          Porção
        </div>
      </div>

      <p className="mt-2 mb-2 font-bold text-[#F2DAAC] uppercase">{category}</p>
      <div className="flex flex-col gap-2 md:gap-3">
        {filteredProduct.map((product) => (
          <Product
            id={product.id}
            description={product.description}
            img={product.img}
            name={product.name}
            price={product.price}
            category={product.category}
            key={product.id}
            setProducts={setProducts}
          />
        ))}
        {filteredProduct.length === 0 && <p>Não há produtos desta categoria</p>}
      </div>
    </div>
  );
};

export default Home;
