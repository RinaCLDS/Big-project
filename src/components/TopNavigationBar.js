import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { domain } from "../data/constant";
import Cookies from "universal-cookie";
import axios from "axios";
function TopNavigationBar() {
  const [data, setData] = useState({"valid":true,"user":{"name":"Gabryel Ardy Echavez","profile_pic":"/media_cdn/profile_images/11/profile_image_Plht2xV.png","nationality":"philippines","state":"rizal","city":"antipolo","village":"dela paz","gotra":"A","blood_group":"A","date_of_birth":"2000","email":"myfluffycy@gmail.com","password":"sample","mobile_number":"09666972501","religion":"catholic"}});
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const openDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const signout = () => {
    const new_cookies = new Cookies();
    new_cookies.remove("token", { path: "/" });
    navigate("/");
  }
  useEffect(()=>{
    const new_cookies = new Cookies();
    const token = new_cookies.get("token");
    axios
      .post(domain+"/gurjar/get_user/", {
        token: token,
      })
      .then((response) => {
        if (!response.data.valid) {
          new_cookies.remove("token", { path: "/" });
          navigate("/");
        } else {
          setData(response.data);
        }
      })
      .catch((error) => console.log(error));

  },[])

  return (
    <div className="flex justify-between items-center px-7 py-3 bg-[#111] text-gray-50 shadow">
      <Link to={'/dashboard'} className="font-bold tracking-wider ">Gurjar.</Link>

      <button
        onClick={openDropdown}
        className="inline-block h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-white cursor-pointer active:ring-transparent"
      >
        <img 
          id="profileImg1"
          className="overflow-hidden rounded-full"
          src={domain+data.user.profile_pic}
          alt="avatar"
        />
      </button>
      {isOpen && (
        <div className="absolute right-1 top-10 mt-2 bg-[#333] divide-y divide-gray-500 rounded-lg shadow-lg z-20">
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
              {data.user.name}
            </div>
            <div
              className="px-4 text-left text-sm text-gray-50"
              role="menuitem"
            >
              {data.user.email}
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
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-[#ffffffb3] hover:text-gray-900"
              role="menuitem"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-[#ffffffb3] hover:text-gray-900"
              role="menuitem"
              onClick={() => navigate('/profile')}
            >
              Profile Settings
            </button>
            <button
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-[#ffffffb3] hover:text-gray-900"
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
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-[#ffffffb3] hover:text-gray-900"
              role="menuitem"
              onClick={signout}
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
