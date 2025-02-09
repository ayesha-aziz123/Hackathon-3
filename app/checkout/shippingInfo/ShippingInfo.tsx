"use client";
import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import Checkout from "@/app/actions/Checkout";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ShippingInfo: React.FC = () => {
  const { cartDetails, totalPrice } = useShoppingCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const { user } = useUser();
  console.log("user_Id clerk ki✨", user?.id);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // ⏳ Start Loader

    try {
      await Checkout(
        Object.values(cartDetails ?? {}),
        formData,
        totalPrice,
        user?.id
      ); // Payment method nahi pass kar raha
      setTimeout(() => {
        setLoading(false); // ⏹ Stop Loader
        router.push("/ordercompleted"); // ✅ Navigate after order creation
      }, 2000);
    } catch (error) {
      console.error("Checkout Error:", error);
      setLoading(false);
    }
  };

  // Ensure that form is valid before enabling proceed button
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city
    );
  };

  return (
    <div className="checkout-container max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleCheckout} className="space-y-6">
        {/* Form fields */}
        <div className="space-y-2">
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium"> Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your city"
            required
          />
        </div>

        {/* Proceed Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!isFormValid() || loading}
          >
            {loading ? "Processing Order..." : "Process to Checkout"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;
