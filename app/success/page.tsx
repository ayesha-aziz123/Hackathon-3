"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const handleTrackOrder = () => {
    // Redirect to the order tracking page
    router.push("/shipping");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6">
          Payment Successful!🎉
        </h1>
        <p className="text-lg text-gray-700 mb-6 md:w-1/2 w-full mx-auto text-center">
          Your payment has been successfully processed. Thank you for your
          purchase. We are preparing your order for shipment.🚛
        </p>


          {/* Track Order Button */}
          <button
            onClick={handleTrackOrder}
            className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-800 transform transition-all duration-300"
          >
            Track Your Order
          </button>
        </div>
      </div>
  );
};

export default SuccessPage;
