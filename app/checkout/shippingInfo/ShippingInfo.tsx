"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart"; // Assuming you're using this package

const ShippingInfo: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const router = useRouter();
  const { redirectToCheckout } = useShoppingCart(); // This is for Stripe integration

  // Handle payment method selection
  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  // Handle form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Proceed button click handler
  const handleProceed = async () => {
    if (paymentMethod === "COD") {
      router.push("/success"); // Route to shipping info if COD
    } else if (paymentMethod === "OnlinePayment") {
      try {
        // Redirect to Stripe checkout page
        const result = await redirectToCheckout();
        if (result?.error) {
          console.log("Error with Stripe checkout:", result.error);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      alert("Please select a payment method💳💵");
    }
  };

  // Ensure that form is valid before enabling proceed button
  const isFormValid = () => {
    return (
      formData.name &&
       formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.postalCode &&
      paymentMethod // Ensure payment method is selected
    );
  };

  return (
    <div className="checkout-container max-w-4xl mx-auto px-4 py-8">
      <form className="space-y-6">
        {/* Form fields */}
        <div className="space-y-2">
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
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
            onChange={handleFormChange}
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
            onChange={handleFormChange}
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
            onChange={handleFormChange}
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
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your postal code"
            required
          />
        </div>

        {/* ... other form fields */}

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="font-semibold">Payment Method</h3>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="OnlinePayment"
                checked={paymentMethod === "OnlinePayment"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Online Payment (Card)
            </label>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleProceed}
            className={`w-full py-3 ${isFormValid() ? "cursor-pointer text-white font-semibold rounded-md hover:bg-blue-700" : "cursor-not-allowed bg-opacity-30 "} bg-blue-600 `}
            disabled={!isFormValid()}
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;
