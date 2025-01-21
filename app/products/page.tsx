import Link from "next/link";
import Image from "next/image";
import React from "react";
import Heading from "@/components/Heading";
import Logos from "@/components/Logos";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  discountPercentage: number;
}

async function getData() {
  const query = ` *[_type == "product" ]{
    _id,
    name,
    "image":image.asset->url,
    price,
    stockLevel,
    category,
    discountPercentage
  }[0...12]`;

  const res = await client.fetch(query);
  console.log(res);
  return res;
}

const Shop = async () => {
  const products: Product[] = await getData();

  return (
    <>
      <Heading
        heading="Shop Grid Default"
        path1="Home"
        path2="Pages"
        path3="Shop Grid Default"
      />
      <section className="my-20">
        <div className="max-w-[84%] mx-auto">
          <div className="flex justify-between items-center gap-10 md:flex-row flex-col">
            <div className="flex flex-col gap-1">
              <h3 className="md:text-[22px] text-[#151875] font-bold">
                Ecommerce Accessories & Fashion Items
              </h3>
              <span className="text-sm text-[#8A8FB9] ">
                About 9,620 results (0.62 seconds)
              </span>
            </div>
            <div className="flex gap-4 items-center md:flex-row flex-col">
              <span className="text-sm text-[#3F509E]">per page:</span>
              <input
                type="number"
                className="bg-transparent border border-gray-200 w-16 p-1"
              />
              <span className="text-sm  text-[#3F509E]">Sort by:</span>
              <select name="sort" id="sort" className="text-sm">
                <option value="newest  text-[#3F509E]">Best Match</option>
                <option value="oldest  text-[#3F509E]">Oldest</option>
              </select>
              <span className="text-[20px]  text-[#3F509E]">View:</span>
              <input
                type="number"
                className="bg-transparent border border-gray-200 p-2"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-4   md:grid-cols-2 grid-cols-1 gap-8 mt-12">
            {products.map((product, id: number) => (
              <Link key={id} href={`/products/${product._id}`}>
                <div className="col-span-1 hover:opacity-65 hover:blur-0  flex items-center flex-col gap-2">
                  <div className="bg-[#F6F7FB] w-full lg:w-[220px] h-[250px]  py-4 flex items-center justify-center">
                    <Image
                      className="hover:scale-110 transition-all duration-300 overflow-hidden  object-cover "
                      src={product.image}
                      width={150}
                      height={150}
                      alt={product.name}
                    />
                  </div>
                  <h3 className=" text-center text-[#151875] font-[700] text-[18px]">
                    {product.name}
                  </h3>
                 

                  <div className="inline-flex gap-x-5">
                    {/* Show discounted price and crossed-out original price only if discountPercentage > 0 */}
                    {product.discountPercentage > 0 ? (
                      <>
                        <span className="text-sm text-[#151875] font-bold">
                          $
                          {product.price -
                            (product.price * product.discountPercentage) / 100}
                        </span>
                        <span
                          style={{ textDecoration: "line-through" }}
                          className="text-sm text-[#FB2E86]"
                        >
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      // Only display original price if no discount
                      <span className="text-sm text-[#151875] font-bold">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Logos />
    </>
  );
};

export default Shop;
