"use client";
import {
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";

function Header() {
  const { cartCount } = useShoppingCart();
  const { user, isLoaded } = useUser();
  const [userName, setUserName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false); // 🔥 New State

  useEffect(() => {
    if (isLoaded && user) {
      setUserName(user.fullName || user.username || user.firstName || "");
    }
  }, [isLoaded, user]);

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault(); // ❌ Stop navigation
      setShowLoginModal(true); // 🔥 Show Modal
    }
  };

  return (
    <>
      <div className="max-w-[1920px] bg-[#7E33E0] md:h-[44px] h-[65px] text-white flex flex-col md:flex-row justify-evenly items-center">
        <div className="flex justify-center items-center md:gap-x-9 gap-x-2">
          <div className="flex items-center md:gap-x-[5px]">
            <MdOutlineEmail />
            <p>mhhasanul@gmail.com</p>
          </div>
          <div className="md:flex hidden items-center gap-x-3">
            <LuPhoneCall />
            <p>(12345)67890</p>
          </div>
        </div>

        <div className="md:flex hidden relative md:gap-x-6 gap-x-2">
          <div className="flex items-center gap-x-[2px]">
            <select className="text-white bg-[#7E33E0]">
              <option>English</option>
              <option>Urdu</option>
            </select>
          </div>
          <div className="flex items-center">
            <select className="text-white bg-[#7E33E0]">
              <option>USD</option>
              <option>Spanish</option>
            </select>
          </div>

          {/* 🛒 Shopping Cart Button */}
          <div className="flex gap-x-1 items-center relative">
            <Link href={"/shoppingCart"} onClick={handleCartClick}>
              <BsCart2 className="size-[25px] hover:text-pink-700" />
              <p className="absolute -top-2 rounded-md text-white -right-2">
                <span className="rounded-3xl py-[3px] px-1 bg-pink-700">
                  {cartCount}
                </span>
              </p>
            </Link>
          </div>
        </div>

        {/* ✅ User Logged In UI */}
        <SignedIn>
          <div className="flex md:flex-row items-center gap-x-9">
            <div>
              <Link href={"/orderList"}>
                <h1 className="border-2 px-2 py-1 hover:bg-pink-600 rounded-sm">
                  Orders
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-x-2">
              <UserButton />
              <h2>{userName}</h2>
            </div>
          </div>
        </SignedIn>

        {/* ❌ User NOT Logged In UI */}
        {!user && (
          <SignInButton mode="modal">
            <button className="text-[18px] font-semibold hover:text-darkColor hoverEffect">
              Login
            </button>
          </SignInButton>
        )}
      </div>

      {/* 🔥 Login Required Popup */}
      {showLoginModal && (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="mb-4">Please log in to access your shopping cart.</p>
            <SignInButton mode="modal">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-800">
                Login Now
              </button>
            </SignInButton>
            <button
              onClick={() => setShowLoginModal(false)}
              className="block mt-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
