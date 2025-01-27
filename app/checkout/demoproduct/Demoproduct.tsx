"use client";
import React from "react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

const DemoProduct = () => {
  const { cartDetails, totalPrice } = useShoppingCart();

  return (
    <div className="md:mt-8 mt-12  ">
      <div className="lg:w-[400px] ">
        {Object.values(cartDetails ?? {}).map((item, i) => {
          return (
            <div key={i} className="  ">
              <div className="w-full flex md:gap-4 gap-2 mb-4  items-center  ">
                <div className="w-[70px]">
                  <Image
                    className=""
                    src={item?.image || ""} 
                    alt={item.name}
                    height={1000}
                    width={1000}
                    
                  />
                </div>
                <div className="flex items-center md:justify-between ">
                  <div>
                    <h4 className="text-[14px] font-semibold">{item.name}</h4>
                    {/* <h5 className="text-tertiary">color:{item.color}</h5> */}
                    <h5 className="text-tertiary">quantity: {item.quantity}</h5>
                  </div>
                  <div className="w-[160px] text-right">
                    <h4>${item.price}</h4>
                  </div>
                </div>
              </div>

              <div className=" border-[1px] mb-4"></div>
            </div>
          );
        })}
      </div>

      <div className=" py-9 px-6 mt-6 mb-12 bg-[#f9fbfd] shadow-xl border">
        <div className="">
          <div className=" flex items-center justify-between">
            <h3 className="text-[14px] text-[#1D3178] font-bold">Subtotals:</h3>
            <h4 className="text-[14px] text-[#1D3178] font-bold">
              ${totalPrice}
            </h4>
          </div>
          <div className="md:w-[350px] border-[1px] mt-2"></div>
        </div>

        <div className="mt-9">
          <div className=" flex items-center justify-between">
            <h3 className="text-[18px] text-[#1D3178] font-bold">Totals:</h3>
            <h4 className="text-[18px] text-[#1D3178] font-bold">
              ${totalPrice}
            </h4>
          </div>
          <div className="md:w-[350px] border-[1px] mt-2"></div>
        </div>
        <div className="my-2 flex items-center justify-between">
            <h3 className="text-[13px] text-[#c66832] font-bold">Shipping:</h3>
            <h4 className="text-[13px] text-[#c66832] font-bold">
              Free
            </h4>
          </div>

        <div className="flex items-center mt-7 gap-1 ">
          <input className=" w-[8px] h-[8px]" type="checkbox" />
          <h6 className="text-[12px] text-[#8A91AB] set_lato">
            Shipping & taxes calculated at checkout
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DemoProduct;
