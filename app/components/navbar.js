'use client';
import React from "react";

export default function Header() {
  return (
    <div className="container mx-auto z-[100]">
<header className="text-white body-font">
  <div className="container mx-auto flex flex-wrap justify-between px-4 py-2 items-center">
    <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12 text-white p-2 bg-orange-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className=" text-white ml-3 text-xl font-black">Quiz Crafter</span>
    </a>

    {(typeof window !== 'undefined') && !localStorage.getItem('username') &&
      <button className=" text-black inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
      <a href="/auth/signIn">
        Login &rarr;
      </a>
    </button>}
            
    {(typeof window !== 'undefined') && localStorage.getItem('username') &&
      <button className=" text-black inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
      <a href="/report">
        Profile &rarr;
      </a>
    </button>}
  </div>
</header>
</div>
  );
}
