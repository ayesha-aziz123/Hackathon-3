"use client";

import { useEffect, useState } from "react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { client } from "@/sanity/lib/client";

const SuccessPage = () => {
  const { clearCart } = useShoppingCart();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const query = `*[_type == "order"] | order(_createdAt desc) { orderId }`;
        const orderData = await client.fetch(query);
        console.log(orderData);
        

        if (orderData && orderData.length > 0) {
          setOrderId(orderData[0].orderId);
          
        }
      } catch (error) {
        console.error("Error fetching orderId:", error);
      }
    };

    fetchOrderId();
  }, []);

  // Clear the cart and then navigate
  const handleNavigate = (path:string) => {
    clearCart();
    window.location.href = path;
  };

  return (
    <div className="py-10 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Order Confirmed!</h1>

        <div className="space-y-4 mb-8 text-left">
          <p className="text-gray-700">
            Thank you for your purchase! Were processing your order and will ship it soon. A confirmation email with your order details will be sent to your inbox shortly.
          </p>
          <p className="text-gray-700">
            Order Number: <span className="text-black font-semibold">{orderId || "Loading..."}</span>
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-gray-900 mb-2">Whats Next?</h2>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>Check your email for order confirmation</li>
            <li>Well notify you when your order ships</li>
            <li>Track your order status anytime</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </button>

          <button
            onClick={() => handleNavigate("/orderList")}
            className="flex items-center justify-center px-4 py-3 font-semibold bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </button>

          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
