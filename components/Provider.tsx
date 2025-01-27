"use client";
import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="https://hackathon-3-hekto-aa.vercel.app/success"
      cancelUrl="https://hackathon-3-hekto-aa.vercel.app/error"
      currency="USD"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider;










// import React, { createContext, useContext, useState, useEffect } from "react";
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image?: string;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// interface CartProviderProps {
//   children: ReactNode;
// }

// export function CartProvider2({ children }: CartProviderProps) {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     // Get cart from localStorage if it exists
//     if (typeof window !== "undefined") {
//       const storedCart = localStorage.getItem("cart");
//       return storedCart ? JSON.parse(storedCart) : [];
//     }
//     return [];
//   });

//   useEffect(() => {
//     // Save cart to localStorage whenever it changes
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     const existing = cart.find((item) => item.id === product.id);
//     if (existing) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id: number) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useShoppingCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useShoppingCart must be used within a CartProvider");
//   }
//   return context;
// }
