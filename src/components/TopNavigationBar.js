import { useState, useEffect } from "react";
import avatar_path from "../images/avatar.jpg";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
function TopNavigationBar({user}) {
  const [data, setData] = useState(user)
  const [avatar, setAvatar] = useState(avatar_path);
  const new_cookies = new Cookies();
  const userData = async () => {
    axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/get_user/', {
      'token': new_cookies.get('token')
    })
    .then((response)=>{
      console.log('response', response)
      setAvatar('https://gurjar-xndl7.ondigitalocean.app'+response.data.user.profile_pic)
    })
    .catch((error)=>console.log(error))
  }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("data");
    new_cookies.remove("token", { path: "/" });
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const openDropdown = () => {
    setData(JSON.parse(localStorage.getItem('data')))
    setIsOpen((prev) => !prev);

  };
  useEffect(() => {
    userData()
  }, [])
  return (
    <div className="flex justify-between items-center px-7 py-2 bg-gray-900 text-gray-50 shadow">
      <div className="font-bold tracking-wider ">Gurjar.</div>

      <button
        onClick={openDropdown}
        className="inline-block h-9 w-9 rounded-full ring-4 ring-transparent hover:ring-slate-800 cursor-pointer active:ring-transparent"
      >
        <img
          
          id="profileImg1"
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
              id="dataName"
              className="px-4 text-left text-sm text-gray-50"
              role="menuitem"
            >
              {data.user.name}
            </div>
            <div
              id="dataEmail"
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
            <Link to={"/dashboard"}
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Dashboard
            </Link>
            <Link to={"/profile"}
              className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Profile Settings
            </Link>
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
              onClick={logout}
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
