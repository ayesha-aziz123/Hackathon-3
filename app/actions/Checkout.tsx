import { formData } from "../interface";
import { client } from "@/sanity/lib/client";
import { CartEntry } from "use-shopping-cart/core";

const createCustomer = async (customerInfo: formData) => {
  try {
    const customerObject = {
      _type: "customer",
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      city: customerInfo.city,
    };

    const response = await client.create(customerObject);
    console.log("Customer created in Sanity:", response);

    return response;
  } catch (error) {
    console.error("Error creating customer in Sanity:", error);
  }
};

const createOrder = async (
  totalPrice: number | undefined,
  cartData: CartEntry[],
  customerId: string,
  clerkuserId: string | undefined
) => {
  try {
    const orderItems = await Promise.all(
      Object.values(cartData ?? {}).map(async (item) => {
        let imageAsset;

        // ✅ Agar image URL hai, to usko fetch karke Blob me convert karo
        if (typeof item.image === "string") {
          const response = await fetch(item.image);
          const blob = await response.blob();
          imageAsset = await client.assets.upload("image", blob); // ✅ Upload Blob to Sanity
        }

        return {
          _type: "productItem",
          _key: item._id,
          product: {
            _type: "reference",
            _ref: item._id,
          },
          name: item.name,
          image: imageAsset
            ? {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: imageAsset._id, // ✅ Correct way to store image in Sanity
                },
              }
            : null, // Agar image upload na ho to null rakho
          quantity: item.quantity,
          price: item.price,
        };
      })
    );

    // Final order object create karna
    const orderObject = {
      orderId: customerId,
      _type: "order",
      customer: {
        _type: "reference",
        _ref: customerId,
      },
      items: orderItems, // Products array with name and image
      order_date: new Date().toISOString(),
      total_price: totalPrice,
      status: "pending",
      clerkuserId: clerkuserId,
    };

    // Sanity mein order create kar rahe hain
    const response = await client.create(orderObject);
    console.log("✅ Order created in Sanity:", response);
  } catch (error) {
    console.error("❌ Error creating order in Sanity:", error);
  }
};

const Checkout = async (
  cartData: CartEntry[],
  formData: formData,
  totalPrice: number | undefined,
  clerkuserId: string | undefined
) => {
  try {
    const customer = await createCustomer(formData);
    if (customer?._id) {
      await createOrder(totalPrice, cartData, customer._id, clerkuserId); // Pass the payment method here
      console.log("Checkout completed successfully ✔");
    }
  } catch (error) {
    console.error("Error during checkout process:", error);
  }
};

export default Checkout;
