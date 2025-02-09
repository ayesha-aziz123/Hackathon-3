"use client"; // Client Component for real-time interactivity

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  discountPercentage: number;
  category: string;
}

export default function SearchWithSanity() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Handle Search Button Click
  const handleSearch = async () => {
    if (query.length > 2) {
      // Fetch data from Sanity for both category and name
      const searchResults = await client.fetch(
        `*[_type == "product" && (category match "${query}*" || name match "${query}*")]{
          name,
          _id,
          "image": image.asset->url,
          price,
          discountPercentage,
          category
        }`
      );
      setResults(searchResults);
      setShowResults(true);
    } else {
      alert("Please enter at least 3 characters to search.");
      setShowResults(false);
    }
  };

  // Handle Clear Search
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative z-[100] flex-wrap mx-auto bg-gray-50 shadow-md rounded max-w-2xl">
      {/* Search Input and Buttons */}
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search name or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 sm:px-3 px-1 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-pink-700 text-white sm:px-4 px-2 py-2 rounded shadow hover:bg-pink-600 transition"
        >
          Search
        </button>
        {showResults && (
          <button
            onClick={handleClear}
            className="bg-gray-300 text-gray-800 px-3 py-2 rounded shadow hover:bg-gray-400 transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="mt-4 bg-white absolute z-10 w-full md:h-[250px] h-44 overflow-y-auto rounded shadow-lg p-3">
          <h2 className="text-lg font-bold mb-2">Search Results:</h2>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {results.map((product: Product) => (
                <Link href={`/products/${product._id}`} key={product._id}>
                  <div className="flex gap-x-4 items-center bg-gray-100 border rounded shadow p-3 hover:bg-gray-200 transition">
                    <Image
                      width={200}
                      height={200}
                      src={product.image}
                      alt={product.name}
                      className="sm:w-16 sm:h-16 w-7 h-7 object-cover rounded"
                    />
                    <div>
                      <h3 className="sm:text-[12px] text-[10px] font-semibold text-gray-700">
                        {product.name}
                      </h3>
                      <p className="text-xs py-1 text-slate-600">
                        Category:{" "}
                        <span className=" ml-3">{product.category}</span>
                      </p>

                      <p className="text-sm pt-2 ">
                        {product.discountPercentage > 0 ? (
                          <span className=" text-gray-500 font-bold">
                            {product.price -
                              (product.price * product.discountPercentage) /
                                100}
                            <span className="text-red-700 ml-9 font-semibold line-through">
                              {product.price}
                            </span>
                          </span>
                        ) : (
                          <p>${product.price}</p>
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found for {query}.</p>
          )}
        </div>
      )}
    </div>
  );
}
