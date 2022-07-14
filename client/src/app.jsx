import { useEffect, useState } from "react";
import Home from "./components/home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import TopBar from "./components/topBar/topBar";
import "./app.scss";
import SignUp from "./components/signup/signup";
import Shop from "./components/shop/shop";
import { AddProduct } from "./components/addProduct/addProduct";
import { EditProduct } from "./components/editProduct/editProduct";
import About from "./components/about/about";
import Footer from "./components/footer/footer";
import Cart from "./components/cart/cart";
import { fetcher } from "./helpers/fetcher";
import { useAuth } from "./auth/authProvider";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { refreshUser } = useAuth();

  useEffect(() => {
    fetcher("/auth/refresh").then((result) => {
      if (result.username) {
        refreshUser(result);
      }
    });
  }, []);

  return (
    <div className="AppRoot">
      <BrowserRouter>
        <TopBar />
        <div id="main">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/shop"
              element={
                <Shop
                  products={products}
                  setProducts={setProducts}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product" element={<EditProduct product={selectedProduct} />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
