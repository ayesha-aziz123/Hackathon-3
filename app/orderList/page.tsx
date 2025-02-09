"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Heading from "@/components/Heading";

// TypeScript types define kar liye
interface Product {
  name: string;
  image: string;
  price: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Customer {
  name?: string;
  email?: string;
}

interface OrderType {
  orderId: string;
  total_price: number;
  order_date: string;
  status: string;
  customer?: Customer;
  items: OrderItem[];
}

const Order = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;

      try {
        const query = `*[_type == "order" && clerkuserId == $userId]{
          orderId,
          total_price,
          order_date,
          status,
          customer->{
            name,
            email
          },
          items[] {
            product->{
              name,
              "image": image.asset->url,
              price
            },
            quantity
          }
        }`;

        const fetchedOrders: OrderType[] = await client.fetch(query, {
          userId: user.id,
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      <Heading heading="My Orders" />
      <div className="container mx-auto md:p-8 p-3 ">
        <div className="overflow-x-auto custom-scrollbar2">
          <table className="w-full mx-auto border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-t border-gray-300 hover:bg-gray-200  cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-4 py-2">{order.orderId}</td>
                    <td className="px-4 py-2">
                      {order.customer?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {order.customer?.email || "N/A"}
                    </td>
                    <td className="px-4 py-2">${order.total_price}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-blue-500">View</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* {selectedOrder && (
          <div className="fixed inset-0 overflow-y-auto  bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl  w-full relative">
              <button
                className="absolute border-4 px-2 py-1 top-2 right-4 text-lg text-gray-700 hover:text-black"
                onClick={() => setSelectedOrder(null)}
              >
                ✖
              </button>
              <h3 className="text-xl font-bold mb-5">Order Details</h3>
              <div className="space-y-3">
                <p>
                  <strong>Order ID:</strong> {selectedOrder.orderId}
                </p>
                <p>
                  <strong>Customer:</strong>{" "}
                  {selectedOrder.customer?.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedOrder.customer?.email || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <div className="mt-4">
                  <h4 className="font-semibold text-lg my-2">Products:</h4>
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mt-2 border p-4 rounded-md shadow-md"
                    >
                      <div>
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <p className="font-semibold">{item.product.name}</p>
                      </div>
                      <div>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )} */}

{selectedOrder && (
  <div className="fixed inset-0 z-[100] my-auto bg-black bg-opacity-50  flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl custom-scrollbar w-full h-[85%]  relative overflow-y-auto">
      <button
        className="absolute border-4 px-2 py-1 top-2 right-4 text-lg text-gray-700 hover:text-black"
        onClick={() => setSelectedOrder(null)}
      >
        ✖
      </button>
      <h3 className="text-xl font-bold text-blue-800 mb-5">Order Details</h3>
      <div className="space-y-3">
        <p>
          <strong>Order ID:</strong> {selectedOrder.orderId}
        </p>
        <p>
          <strong>Customer:</strong> {selectedOrder.customer?.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {selectedOrder.customer?.email || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {selectedOrder.status}
        </p>
        <div className="mt-4">
          <h4 className="font-semibold text-lg my-2">Products:</h4>
          <div className="max-h-[400px] custom-scrollbar overflow-y-auto space-y-2">
            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                className="flex hover:scale-[1.02] transition-all ease-in cursor-pointer hover:bg-gray-200 justify-between items-center mt-2 border p-4 rounded-md shadow-md"
              >
                <div>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <p className="font-semibold w-36">{item.product.name}</p>
                </div>
                <div>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default Order;
