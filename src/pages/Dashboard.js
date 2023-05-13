import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; //import react-leaflet packages
import avatar from '../images/avatar.jpg'

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const openDropdown = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <div className="main">
      <div className="flex justify-between items-center px-7 py-2 bg-gray-900 text-gray-50 shadow">
        <div className="font-bold tracking-wider ">Gurjar.</div>

        <button onClick={openDropdown} className="inline-block h-9 w-9 rounded-full ring-4 ring-transparent hover:ring-slate-800 cursor-pointer active:ring-transparent"><img className="overflow-hidden rounded-full" src={avatar} alt="avatar" /></button>
        {
          isOpen &&
          <div className="absolute right-1 top-10 mt-2 bg-gray-700 divide-y divide-gray-500 rounded-lg shadow-lg z-20">
            <div className="py-3 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {/* Add your dropdown options here */}
              <div className="px-4 text-left text-sm text-gray-50" role="menuitem">John Doe</div>
              <div className="px-4 text-left text-sm text-gray-50" role="menuitem">johndoe@gmail.com</div>
            </div>
            <div className="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {/* Add your dropdown options here */}
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Dashboard</button>
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile Settings</button>
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Points</button>
            </div>
            <div className="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {/* Add your dropdown options here */}
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sign Out</button>
            </div>
          </div>
        }

      </div>



      {/* Content */}
      <div className="container mx-auto max-w-5xl">
        {/* MAP */}
        <div className="my-2 shadow">
          {/* Map Container, where all map the customizing goes... */}
          <MapContainer
            center={[51.505, -0.09]}
            zoom={1.5}
            scrollWheelZoom={false}
            style={{ height: "600px", zIndex: 0 }}
          >
            {/* Here as you can see, I put a different tile layer (Carto maps) to continue customizing panes*/}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            />

            {/* The Marker and the popup tells the place you started. (A follow up feature where you will start at your current location should be added ) */}
            <Marker position={[51.505, -0.09]}>
              <Popup>You are here!</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* User */}
        <div className="mb-10">
          <p>Gurjar Population of the World: </p>
          <p>Gurjar Population of India: </p>
          <p>Gurjar ID: </p>
          <p>Gurjar Points: </p>
        </div>

        {/* Map Details */}
        <table className="table-auto w-full text-left shadow rounded-lg">
          <thead className="bg-gray-900 text-gray-50 px-4 py-2">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg">Countries</th>
              <th className="px-4 py-2 rounded-tr-lg">Population</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="pl-4 pr-2 py-1">India</td>
              <td className="pl-4 pr-2 py-1">99,999</td>
            </tr>
            <tr>
              <td className="pl-4 pr-2 py-1">Philippines</td>
              <td className="pl-4 pr-2 py-1">78,381</td>
            </tr>
            <tr>
              <td className="pl-4 pr-2 py-1">Vietnam</td>
              <td className="pl-4 pr-2 py-1">100,101</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
