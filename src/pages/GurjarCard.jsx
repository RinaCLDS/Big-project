import { AiFillCloseCircle } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

export default function GurjarCard({avatar,data, visible, onClose }) {
  const get = (element) => document.querySelector(element);
  
  const downloadCard = () => {
    const gurjarCardUser = get('#gurjarCard');
    // eslint-disable-next-line no-restricted-globals
    print(gurjarCardUser);
    // html2canvas(gurjarCardUser, {allowTaint: true, useCORS: true})
    // .then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   const prop = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (prop.height * pdfWidth) / prop.width;
    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.save(`${data.gurjar_id}-Card.pdf`);
    // })
  }

  if (!visible) return null;

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div id='gurjarCard' className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <div className="flex flex-col  w-89 h-50 justify-center p-6 shadow-md rounded-xl sm:px-12 border backg ">
        <div id='closeCard' className="lg:flex justify-end">
          <button onClick={handleOnClose}>
            <AiFillCloseCircle />{" "}
          </button>
        </div>
        <img src={avatar} alt="NoImage" className="w-32 h-32 mx-auto rounded-full bg-white aspect-square" />
        <div className="w-89 h-50 space-y-4 text-center divide-y divide-gray-700">
          <div className="my-2 space-y-1">
            <h2 id="name" className=" text-xl font-semibold sm:text-2xl">
              Name: {data.name}
            </h2>
            <p className="px-5 text-xs sm:text-base dark:text-white-400">
              Gurjar ID: {data.gurjar_id}
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
          <div id="downloadCard" onClick={downloadCard} className="flex justify-end">
            <button>
              <FiDownload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
