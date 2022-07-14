import { useEffect } from "react";
import { fetcher } from "../../helpers/fetcher";
import Grid from "./grid/grid";
import Product from "./product/product";

const Shop = ({
  setProducts,
  products,
  selectedProduct,
  setSelectedProduct,
}) => {
  useEffect(() => {
    const getProducts = async () => {
      const products = await fetcher("/products", "GET");
      setProducts(products);
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!selectedProduct ? (
        <Grid products={products} setSelectedProduct={setSelectedProduct} />
      ) : (
        <Product
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </>
  );
};

export default Shop;
