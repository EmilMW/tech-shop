import "./product.scss";
import Button from "@mui/material/Button";
import { useAuth } from "../../../auth/authProvider";
import { fetcher } from "../../../helpers/fetcher";
import { Navigate, useNavigate } from "react-router";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useCart } from "../../../cart/cartProvider";

const Product = ({ product, setSelectedProduct }) => {
  const auth = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const handleDelete = async () => {
    await fetcher(`/products/${product._id}`, "DELETE");
    setSelectedProduct(null);
  };

  const handleEdit = () => {
    navigate("/edit-product");
  };
  const handleEditButton = () => {
    navigate("/login");
  };

  return (
    <div id="product">
      <div className="root">
        <div className="card">
          <div className="backButton">
            <Button sx={{ color: "#01579B" }} onClick={() => setSelectedProduct(null)}>
              Go Back
            </Button>
            {auth?.user?.type === "admin" && (
              <>
                <Button sx={{ color: "#01579B" }} onClick={handleEdit}>
                  Edit
                </Button>
                <Button sx={{ color: "#01579B" }} onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </div>
          <div className="container">
            <div className="imgContainer" onClick={() => setSelectedProduct(product)}>
              <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className="details">
              <h1 className="title">{product.name}</h1>

              <br />

              <div className="description">{product.description}</div>
              <div className="price">{product.price}$</div>
              <br />
            </div>
          </div>

          <br />

          <div className="purchaseButton">
            {auth.user ? (
              <>
                <Button sx={{ color: "#01579B" }} onClick={() => addToCart(product, quantity)}>
                  Add to Cart
                </Button>
                <TextField
                  type="number"
                  sx={{ padding: "0px", width: "65px" }}
                  size="small"
                  InputProps={{
                    name: "quantity",
                    id: "quantity",
                    value: quantity,
                    onChange: (e) => setQuantity(e.target.value),
                  }}
                />
              </>
            ) : (
              <Button sx={{ color: "#01579B" }} onClick={handleEditButton}>
                Please login to purchase in this item
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
