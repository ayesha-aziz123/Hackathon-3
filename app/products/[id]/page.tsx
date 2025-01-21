"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import RelatedProducts from "@/components/RelatedProducts";
import ProductsDescriptions from "@/components/ProductsDescriptions";
import Logos from "@/components/Logos";
import StarRatings from "react-star-ratings";
import AddtoBag from "@/components/AddtoBag";
import { client } from "@/sanity/lib/client";
import { MdFacebook } from "react-icons/md";
import { FaGithub, FaInstagram } from "react-icons/fa";

type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stockLevel: number;
  category: string;
  discountPercentage: number;
};

function ProductDetails({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Product | null>(null);
  const [error, setError] = useState<boolean>(false); // Error stat

  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    name,
    description,
    "image": image.asset->url,
    price,
    stockLevel,
    category,
    discountPercentage
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(query, { id: params.id });
        if (product) {
          setData(product);
          setError(false);
        } else {
          setError(true); // No product found
        }
      } catch (err) {
        setError(true);
        console.log(err);
        // Fetch failed
      }
    };

    fetchData();

    // Real-time stock updates
    const subscription = client
      .listen(query, { id: params.id })
      .subscribe((update) => {
        setData((prev: Product | null) => {
          if (!prev) return null; // If prev is null, return null
          return {
            ...prev,
            stockLevel: update.result?.stockLevel ?? prev.stockLevel, // Update stockLevel
          };
        });
      });

    return () => subscription.unsubscribe();
  }, [params.id, query]);

  if (error) {
    return (
      <h1 className="flex justify-center text-red-700 font-bold text-4xl pt-4">
        An Error!
      </h1>
    );
  }

  return (
    <main>
      <Heading
        heading="Product Details"
        path1="Home"
        path2="Pages"
        path3="Product Details"
      />
      {data ? (
        <section className="my-20">
          <div className="max-w-[84%] mx-auto">
            <div className="bg-white w-full md:flex-row flex-col py-4 flex justify-center items-center gap-8">
              {/* Image Section */}
              <div className="flex flex-row gap-4 md:gap-9 items-center md:w-[50%]">
                <div className="flex flex-col gap-3">
                  <Image
                    className="p-3 shadow-lg"
                    src={data.image}
                    width={100}
                    height={100}
                    alt="image"
                  />
                  <Image
                    className="p-3 shadow-lg"
                    src={data.image}
                    width={100}
                    height={100}
                    alt="image"
                  />
                  <Image
                    className="p-3 shadow-lg"
                    src={data.image}
                    width={100}
                    height={100}
                    alt="image"
                  />
                </div>
                <div className="relative items-center shadow-xl">
                  {/* Badge for stock status */}
                  <div className="absolute top-0 left-0">
                    {data.stockLevel > 0 ? (
                      <span className="bg-green-600 text-white px-3 py-2 rounded-[9px] text-xs font-bold">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-2 rounded-[9px] text-xs font-bold">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <Image
                    src={data.image}
                    width={300}
                    height={300}
                    alt={data.name}
                    className="w-[300px] p-3 object-cover"
                  />
                </div>
              </div>

              {/* Product Info Section */}
              <div className="md:w-[45%] flex items-start gap-4 flex-col">
                <h3 className="text-3xl font-bold">{data.name}</h3>
                <div className="inline-flex gap-x-3 items-center">
                  <StarRatings
                    starRatedColor="orange"
                    numberOfStars={5}
                    rating={4} // Static rating
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                  <span>(22)</span>
                </div>
                <div className="inline-flex gap-x-5">
                  {/* Show discounted price and crossed-out original price */}
                  {data.discountPercentage > 0 ? (
                    <>
                      <span className="text-[17px] text-[#151875] font-bold">
                        $
                        {data.price -
                          (data.price * data.discountPercentage) / 100}
                      </span>
                      <span
                        style={{ textDecoration: "line-through" }}
                        className="text-[16px] text-[#f83434]"
                      >
                        ${data.price}
                      </span>
                      <p>{data.discountPercentage}%off</p>
                    </>
                  ) : (
                    <span className="text-sm text-[#151875] font-bold">
                      ${data.price}
                    </span>
                  )}
                </div>

                <AddtoBag
                  key={data._id}
                  name={data.name}
                  image={data.image} // Pass image to AddtoBag
                  discountPercentage={
                    data.price - (data.price * data.discountPercentage) / 100
                  }
                  currency={"USD"}
                  _id={data._id}
                  stockLevel={data.stockLevel}
                />

                <span className="text-[20px] font-[500]">
                  Stock: {data.stockLevel}
                </span>
                <p className="text-md text-[#868ab4] leading-[20px]">
                  {data.description}
                </p>
                <span className="text-md text-[#151875] font-bold">
                  Categories:{" "}
                  <span className="text-orange-700">{data.category}</span>
                </span>
                <div className="inline-flex text-[20px] gap-x-4">
                  <span className="text-[17px] text-[#151875] font-bold">
                    Share
                  </span>
                  <MdFacebook />
                  <FaInstagram />
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1 className="flex justify-center text-red-700 font-bold text-5xl pt-4">
          Items Not Found!
        </h1>
      )}

      {/* Product Descriptions & Related Products */}
      <ProductsDescriptions />
      <RelatedProducts />
      <Logos />
    </main>
  );
}

export default ProductDetails;
