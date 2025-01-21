"use client"
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { useShoppingCart } from "use-shopping-cart";

function Header() {

  const {cartCount} = useShoppingCart()

  return (
    <div className="max-w-[1920px] bg-[#7E33E0] md:h-[44px] h-[65px] text-white  md:flex-row flex-col flex justify-evenly items-center">
      <div className="flex justify-center items-center md:gap-x-9 gap-x-2">
        <div className="flex items-center md:gap-x-[5px]">
          <MdOutlineEmail />
          <p>mhhasanul@gmail.com</p>
        </div>
        <div className="flex items-center gap-x-3">
          <LuPhoneCall className="" />
          <p>(12345)67890</p>
        </div>
      </div>

      <div className="md:flex hidden  md:gap-x-6 gap-x-2">
        <div className="flex items-center gap-x-[2px]">
          <select className="text-white bg-[#7E33E0]">
            <option>English</option>
            <option>Urdu</option>
          </select>
         
        </div>
        <div className="flex items-center gap-x-[2px]">
          USD{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        <div className="flex  hover:text-pink-500 hover:scale-125 items-center gap-x-3">
          <Link className="flex" href={"/myaccount"}>
          Login
            <FiUser className="size-[20px] md:gap-x-2 " />
          </Link>
        </div>
        <div className="flex items-center md:gap-x-2">
          <Link className="flex gap-x-2  hover:text-pink-500 hover:scale-125" href={""}>
          Wishlist <FaRegHeart className="size-[20px] " />
          </Link>
        </div>
        <div className="flex gap-x-1 items-center relative">
          <Link  href={"/shoppingCart"}>
            {" "}
            <BsCart2 className="size-[25px]  hover:text-pink-700" />
            <p className="absolute -top-2  rounded-md text-white -right-2" >
              <span className="rounded-3xl py-[3px] px-1 bg-pink-700">{cartCount}</span></p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
