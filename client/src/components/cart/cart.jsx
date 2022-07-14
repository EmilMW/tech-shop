import "./cart.scss";
import { useCart } from "../../cart/cartProvider";
import { useAuth } from "../../auth/authProvider";

const Cart = () => {
  const { cart, deleteFromCart, updateQuantity } = useCart();
  const auth = useAuth();

  if (!auth?.user) {
    return <div style={{ color: "white" }}>You must be logged in to access your cart</div>;
  }
  return (
    <div id="cart">
      {cart.map(({ product, quantity }, index) => {
        return (
          <div key={index} className="cartRow">
            <img src={product.imgUrl} alt={product.name} />
            <div>{product.name}</div>
            <div>
              <button onClick={() => updateQuantity(product._id, quantity - 1)}> - </button> {quantity}{" "}
              <button onClick={() => updateQuantity(product._id, quantity + 1)}> + </button>
            </div>
            <div>{product.price}$</div>
            <div>{(product.price * quantity).toFixed(2)}$</div>
            <button onClick={() => deleteFromCart(product._id)}>Remove</button>
          </div>
        );
      })}
      <div className="cartRow">
        <div>Total:</div>
        <div>{cart.reduce((a, b) => a + b.product.price * b.quantity, 0).toFixed(2)}$</div>
      </div>
      <br />
    </div>
  );
};

export default Cart;
