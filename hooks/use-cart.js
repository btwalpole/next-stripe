import { useState } from "react";
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
  products: {}, //easier to icompare one object to another than with arrays
};

export default function useCart() {
  const [cart, updateCart] = useState(defaultCart);

  //create array from current cart state, map over it and return
  //each item + it's price (taken from the products.json)
  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  const subTotal = cartItems.reduce(
    (accumulator, { pricePerItem, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  console.log("subTotal: ", subTotal);

  console.log("cartItems", cartItems);

  function addToCart({ id } = {}) {
    updateCart((prev) => {
      let cartState = { ...prev }; //create copy of prev state

      if (cartState.products[id]) {
        console.log("product with id already in cart: ", id);
        cartState.products[id].quantity++;
      } else {
        console.log("product with id not yet in cart: ", id);
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cartState;
    });
  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }

  return {
    cart,
    updateCart,
    subTotal,
    totalItems,
    addToCart,
    checkout,
  };
}
