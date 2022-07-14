import { useState } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import "./editProduct.scss";
import { useNavigate } from "react-router";

export const EditProduct = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [imgUrl, setImgUrl] = useState(product.imgUrl);
  const [price, setPrice] = useState(product.price);
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    try {
      const result = await fetcher(`/products`, "PUT", {
        _id: product._id,
        name,
        description,
        imgUrl,
        price,
      });
      if (result) {
        alert("Edited successfully");
        navigate("/shop");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id="editProduct">
      <h1 className="title">Edit Product</h1>
      <TextField
        label="Product Name"
        className="input"
        InputProps={{
          name: "name",
          id: "name",
          value: name,
          onChange: (e) => setName(e.target.value),
        }}
      />
      <br></br>

      <TextField
        label="Price"
        type="number"
        className="input"
        InputProps={{
          name: "amount",
          id: "amount",
          value: price,
          onChange: (e) => setPrice(e.target.value),
        }}
      />
      <br></br>
      <TextField
        label="Image url"
        type="text"
        className="input"
        InputProps={{
          name: "image",
          id: "image",
          value: imgUrl,
          onChange: (e) => setImgUrl(e.target.value),
        }}
      />
      <br></br>
      <TextareaAutosize
        minRows={3}
        className="input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br></br>
      <br></br>
      <Button onClick={handleAddProduct} variant="contained">
        Edit product
      </Button>
    </div>
  );
};
