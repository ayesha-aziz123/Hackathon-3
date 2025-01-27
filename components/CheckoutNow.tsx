"use client";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";
import { ProductsCart } from "./AddtoBag";

function CheckoutNow({
  name,
  discountPercentage,
  image,
  currency,
  product_id,
}: ProductsCart) {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(price_id: string) {
    checkoutSingleItem(price_id);
  }

  const products = {
    name: name,
    price: discountPercentage,
    currency: currency,
    image: image,
    product_id: product_id,
    id: product_id,
  };

  return (
    <Button
      className="bg-blue-800 rounded-[8px] text-white hover:bg-slate-900"
      onClick={() => {
        buyNow(products.product_id);
      }}
    >
      Checkout Now
    </Button>
  );
}

export default CheckoutNow;
