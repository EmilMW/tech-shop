import { useState } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import "./addProduct.scss";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);

  const handleAddProduct = async () => {
    const result = await fetcher(`/products`, "POST", {
      name,
      description,
      imgUrl,
      price,
    });
    if (result) {
      alert("Added successfully");
    }
  };

  return (
    <div id="addProduct">
      <h1 className="title">Add Product</h1>
      <div className="form">
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
          Add product
        </Button>
      </div>
    </div>
  );
};
