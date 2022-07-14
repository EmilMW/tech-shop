import "./gridItem.scss";

export const GridItem = ({ product, setSelectedProduct }) => {
  return (
    <div className="board">
      <div className="card">
        <div className="imgContainer" onClick={() => setSelectedProduct(product)}>
          <img className="img" src={product.imgUrl} alt={product.name} />
        </div>
        <h1 className="title">{product.name}</h1>
        <p className="description ellipsis">{product.description}</p>
        <p className="price">{product.price}$</p>
        <span className="directionalSpan">Click on the image to view product page.</span>
      </div>
    </div>
  );
};
