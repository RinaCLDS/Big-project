import React, { useState } from "react";
import avatar from "../images/avatar.jpg";

function TopNavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const openDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="flex justify-between items-center px-7 py-2 bg-gray-900 text-gray-50 shadow">
      <div className="font-bold tracking-wider ">Gurjar.</div>

      <button
        onClick={openDropdown}
        className="inline-block h-9 w-9 rounded-full ring-4 ring-transparent hover:ring-slate-800 cursor-pointer active:ring-transparent"
      >
        <img
          className="overflow-hidden rounded-full"
          src={avatar}
          alt="avatar"
        />
      </button>
      {isOpen && (
        <div className="absolute right-1 top-10 mt-2 bg-gray-700 divide-y divide-gray-500 rounded-lg shadow-lg z-20">
          <div
            className="py-3 flex flex-col"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Add your dropdown options here */}
            <div
              className="px-4 text-left text-sm text-gray-50"
              role="menuitem"
            >
              John Doe
            </div>
            <div
              className="px-4 text-left text-sm text-gray-50"
              role="menuitem"
            >
              johndoe@gmail.com
            </div>
          </div>
          <div
            className="py-1 flex flex-col"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Add your dropdown options here */}
            <button
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Dashboard
            </button>
            <button
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Profile Settings
            </button>
            <button
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Points
            </button>
          </div>
          <div
            className="py-1 flex flex-col"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Add your dropdown options here */}
            <button
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopNavigationBar;
