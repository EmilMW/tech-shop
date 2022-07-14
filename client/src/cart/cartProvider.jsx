import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/authProvider";
import { fetcher } from "../helpers/fetcher";

const CartContext = React.createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      fetcher(`/carts/${user.username}`).then((cartItems) => {
        setCart(cartItems);
      });
    }
  }, [user]);

  const deleteFromCart = async (id) => {
    const newCart = cart.filter((cartItem) => cartItem.product._id !== id);
    console.log("id", id);
    console.log("newCart", newCart);
    await fetcher(`/carts/${id}`, "DELETE");
    setCart(newCart);
  };

  const updateQuantity = async (id, quantity) => {
    const newCart = cart
      .map((cartItem) => {
        if (cartItem.product._id === id) {
          cartItem.quantity = quantity;
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);
    await fetcher(`/carts/${id}/${quantity}`, "PUT", { quantity });
    setCart(newCart);
  };

  const emptyCart = () => {
    setCart([]);
  };

  const addToCart = async (product, quantity) => {
    if (user) {
      try {
        // const currentCart = await fetcher(`/carts/${product._id}/${quantity}`);
        // console.log("currentCart", currentCart);
        setCart((prevCart) => {
          if (prevCart.find((item) => item.product._id === product._id)) {
            const newCart = prevCart.map((item) => {
              if (item.product._id === product._id) {
                return {
                  ...item,
                  quantity: parseFloat(item.quantity) + parseFloat(quantity),
                };
              }
              return item;
            });
            return newCart;
          }
          return [...prevCart, { product, quantity }];
        });
      } catch (err) {
        alert("Error adding to cart" + err.message);
      }
    }
  };

  const value = { cart, deleteFromCart, addToCart, updateQuantity, emptyCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return React.useContext(CartContext);
}
