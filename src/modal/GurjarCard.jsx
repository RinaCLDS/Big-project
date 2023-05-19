import {useRef} from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default function GurjarCard({ avatar, data, visible, onClose }) {
  const get = (element) => document.querySelector(element);
  const downloadCard = () => {
    const pdf = new jsPDF();

    html2canvas(get('#gurjarCard'), {allowTaint: true, useCORS: true}).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 680; // A4 width (in mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const posX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
      const posY = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', posX, posY, imgWidth, imgHeight);
      pdf.save('output.pdf');
    });
  };
  if (!visible) return null;

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div id='gurjarCard' className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="flex flex-col  w-89 h-50 justify-center p-6 shadow-md rounded-xl sm:px-12 border backg "
      >
        <div className="lg:flex justify-end">
          <button onClick={handleOnClose}>
            <AiFillCloseCircle />{" "}
          </button>
        </div>
        <img
          src={avatar}
          alt="No Image"
          className="w-32 h-32 mx-auto rounded-full bg-white aspect-square"
        />
        <div className="w-89 h-50 space-y-4 text-center divide-y divide-gray-700">
          <div className="my-2 space-y-1">
            <h2 id="name" className=" text-xl font-semibold sm:text-2xl">
              {data.name}
            </h2>
            <p className="px-5 text-xs sm:text-base dark:text-white-400">
              {data.gurjar_id}
            </p>
          </div>
          <div className="pt-2 space-x-4 ">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="GitHub"
              className="p-2 rounded-md text-white"
            />
            <div className="mb-4 grid grid-cols-2 grid-rows-2">
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                State: {data.state}
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Country: {data.nationality}
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                City: {data.city}
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Village: {data.village}
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Blood group: {data.blood_group}
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Birth date: {data.date_of_birth}
              </p>
              <p className="px-5 text-xs sm:text-base dark:text-white-400">
                Gotra: {data.gotra}
              </p>
            </div>
          </div>
          <div onClick={downloadCard} className="flex justify-end">
            <button>
              <FiDownload />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
