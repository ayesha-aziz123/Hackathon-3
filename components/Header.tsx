"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { useShoppingCart } from "use-shopping-cart";

function Header() {
  const { cartCount } = useShoppingCart();
  const { user } = useUser();

  return (
    <div className="max-w-[1920px] bg-[#7E33E0] md:h-[44px] h-[65px] text-white  md:flex-row flex-col flex justify-evenly items-center">
      <div className="flex justify-center items-center md:gap-x-9 gap-x-2">
        <div className="flex items-center md:gap-x-[5px]">
          <MdOutlineEmail />
          <p>mhhasanul@gmail.com</p>
        </div>
        <div className="md:flex hidden items-center gap-x-3">
          <LuPhoneCall className="" />
          <p>(12345)67890</p>
        </div>
      </div>

      <div className="md:flex hidden relative  md:gap-x-6 gap-x-2">
        <div className="flex items-center gap-x-[2px]">
          <select className="text-white bg-[#7E33E0]">
            <option>English</option>
            <option>Urdu</option>
          </select>
        </div>
        <div className="flex items-center ">
          <select className="text-white bg-[#7E33E0]">
            <option>USD</option>
            <option>Spanish</option>
          </select>
        </div>

        <div className="flex items-center md:gap-x-2">
          <Link
            className="flex gap-x-2  hover:text-pink-500 hover:scale-125"
            href={""}
          >
            Wishlist <FaRegHeart className="size-[20px] " />
          </Link>
        </div>

        <div className="flex gap-x-1 items-center relative">
          <Link href={"/shoppingCart"}>
            {" "}
            <BsCart2 className="size-[25px]  hover:text-pink-700" />
            <p className="absolute -top-2  rounded-md text-white -right-2">
              <span className="rounded-3xl py-[3px] px-1 bg-pink-700">
                {cartCount}
              </span>
            </p>
          </Link>
        </div>
      </div>

      <div className="">
        <div className="flex gap-x-2 items-center">
          <SignedOut>
            <SignInButton>
              <button className="text-xl">Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <h1 className="font-bold">{user?.fullName}</h1>
        </div>
      </div>
      {/* <div className="flex">
          <SignedOut>
            <SignInButton>
              <button>Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <h1>{user?.firstName}</h1>
        </div> */}
    </div>
  );
}

export default Header;
