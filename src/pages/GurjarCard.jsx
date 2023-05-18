import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";

export default function GurjarCard({ visible, onClose }) {
  if (!visible) return null;

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <div className="flex flex-col  w-89 h-50 justify-center p-6 shadow-md rounded-xl sm:px-12 border backg ">
        <div className="lg:flex justify-end">
          <button onClick={handleOnClose}>
            <AiFillCloseCircle />{" "}
          </button>
        </div>
        <img className="w-32 h-32 mx-auto rounded-full bg-white aspect-square" />
        <div className="w-89 h-50 space-y-4 text-center divide-y divide-gray-700">
          <div className="my-2 space-y-1">
            <h2 id="name" className=" text-xl font-semibold sm:text-2xl">
              Name
            </h2>
            <p className="px-5 text-xs sm:text-base dark:text-white-400">
              Gurjar ID:
            </p>
          </div>
          <div className="pt-2 space-x-4 ">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="GitHub"
              className="p-2 rounded-md text-white"
            />
            <div className="mb-4 space-y-3 grid grid-cols-2 grid-rows-2">
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                State:
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Country:
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                City:
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Village:
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Blood group:
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Birth date:
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Gotra:
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button>
              <FiDownload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
