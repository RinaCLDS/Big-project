import React from "react";

function SkeletonTopNavigationBar() {
  return (
    <div className="flex justify-between items-center px-7 py-3 bg-[#111] text-gray-50 shadow">
      <div className="animate-pulse">
        <div className="font-bold tracking-wider w-16 h-5 bg-gray-300 rounded"></div>
      </div>

      <div className="inline-block h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-white cursor-pointer active:ring-transparent">
        <div className="animate-pulse">
          <div className="overflow-hidden rounded-full w-9 h-9 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonTopNavigationBar;
