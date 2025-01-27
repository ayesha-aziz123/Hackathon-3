"use client";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import Link from "next/link";

// interface CartItem {
//   id: string;
//   name: string;
//   image?: string;
//   price: number;
//   quantity: number;
// }

const ShoppingCart: React.FC = () => {
  const {
    cartCount,
    clearCart,
    totalPrice,
    cartDetails,
    removeItem,
  } = useShoppingCart();


  return (
    <div className="bg-white text-[#1D3178] max-w-[1920px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-center py-12 lg:py-24 gap-6 px-4 sm:px-8">
        <div className="p-4 sm:p-6 rounded-md shadow-md lg:w-3/5 overflow-auto">
          <table className="w-full text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 md:p-4 font-semibold">Product</th>
                <th className="p-2 md:p-4 font-semibold">Price</th>
                <th className="p-2 md:p-4 font-semibold">Quantity</th>
                <th className="p-2 md:p-4 font-semibold">Total</th>
                <th className="p-2 md:p-4 font-semibold">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartCount === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    <h1 className="text-2xl">Your cart is empty.</h1>
                  </td>
                </tr>
              ) : (
                Object.values(cartDetails ?? {}).map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 md:p-4 min-w-full flex items-center">
                      <Image
                        src={item.image || "/fallback-image.jpg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded mr-4"
                      />
                      <span className="truncate w-36 md:w-48">{item.name}</span>
                    </td>
                    <td className="p-2 md:p-4">${item.price}</td>
                    {/* <td className="p-4 md:p-4">
                      <div className="md:w-28 w-28">
                        <button
                          className="px-2 border rounded mr-2"
                          onClick={() => handleDecrement(item)}
                          disabled={item.quantity === 1 || isUpdating}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="px-2 border rounded ml-2"
                          onClick={() => handleIncrement(item)}
                          disabled={isUpdating}
                        >
                          +
                        </button>
                      </div>
                    </td> */}
                    <td className="p-2 md:p-4">
                      <div>
                        <p className="border p-2 text-center font-bold"> {item.quantity}</p>
                        
                      </div>
                    </td>

                    <td className="p-2 md:p-4">
                      ${item.price * item.quantity}
                    </td>
                    <td
                      className="p-1 text-center md:p-4 text-3xl text-red-600 cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      &times;
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="my-7">
            <button
              className="bg-red-400 p-4 text-white font-semibold"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full lg:w-2/5">
          <div className="bg-[#F4F4FC] p-6 rounded-md shadow-md">
            <h1 className="text-xl text-center pb-4 font-semibold">
              Cart Totals
            </h1>
            <div className="flex justify-between py-4">
              <h2 className="font-semibold">Subtotals:</h2>
              <p>${totalPrice}</p>
            </div>
            <hr />
            <div className="flex justify-between py-4">
              <h2 className="font-semibold">Totals:</h2>
              <p>${totalPrice}</p>
            </div>
            <hr />
            <p className="text-sm py-4 text-gray-600">
              Shipping & taxes calculated at checkout.
            </p>
            <Link href={"/checkout"}>
              <button className="bg-[#19D16F] text-white w-full h-12 rounded-md font-semibold">
                Proceed To Checkout
              </button>
            </Link>
          </div>
          {/* <div className="bg-[#F4F4FC] p-6 rounded-md shadow-md">
            <h1 className="text-xl text-center pb-4 font-semibold">
              Calculate Shipping
            </h1>
            <h2 className="py-4 font-semibold">Bangladesh</h2>
            <hr />
            <h2 className="py-4 font-semibold">Mirpur Dhaka - 1200</h2>
            <hr />
            <p className="text-sm py-4 text-gray-600">
              Shipping & taxes calculated at checkout.
            </p>
            <Link href="/demo">
              <button className="bg-[#FB2E86] text-white w-full h-12 rounded-md font-semibold">
                Calculate Shipping
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
