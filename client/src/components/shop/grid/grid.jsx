import { GridItem } from "./gridItem/gridItem";
import "./grid.scss";

const Grid = ({ products, setSelectedProduct }) => {
  return (
    <div id="grid">
      <div className="grid">
        {products.map((product, index) => {
          return (
            <GridItem
              key={index}
              product={product}
              setSelectedProduct={setSelectedProduct}
            />
          );
        })}
      </div>
      <br />
    </div>
  );
};

export default Grid;
