export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  category: string;
};

export type ProductProps = ProductType & {
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
