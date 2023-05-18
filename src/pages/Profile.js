import React, { useState, useEffect } from "react";
import avatar_path from "../images/avatar.jpg";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Tab, initTE } from "tw-elements";
import { GrDocumentUpdate } from "react-icons/gr";
import { ImProfile } from "react-icons/im";

const Profile = () => {
  
  const get = (element) => document.querySelector(element);
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(avatar_path);
  const openDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const formSubmit = (e) => e.preventDefault();
  const [user, setUser] = useState({});
  const new_cookies = new Cookies();
  const navigate = useNavigate();

  const updateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const appendIfValid = (formData, key, selector) => {
      const value = get(selector).value;
      if (value.split(" ").join("").length > 0) {
        formData.append(key, value);
      }
    };

    formData.append("token", token);
    if (get("#profile").files[0] !== undefined) {
      formData.append("profile_pic", get("#profile").files[0]);
    }

    appendIfValid(formData, "name", "#name");
    appendIfValid(formData, "religion", "#religion");
    appendIfValid(formData, "state", "#state");
    appendIfValid(formData, "city", "#city");
    appendIfValid(formData, "village", "#village");
    appendIfValid(formData, "nationality", "#nationality");
    appendIfValid(formData, "gender", "#gender");
    appendIfValid(formData, "gotra", "#gotra");
    appendIfValid(formData, "blood_group", "#blood_group");
    appendIfValid(formData, "date_of_birth", "#date_of_birth");
    appendIfValid(formData, "password", "#password");
    appendIfValid(formData, "email", "#email");
    appendIfValid(formData, "mobile_number", "#number");

    // console.log(
    //   get("#profile").files[0] === undefined,
    //   "test",
    //   get("#religion").value.split(" ").join("").length
    // );
    axios
      .put(
        "https://gurjar-xndl7.ondigitalocean.app/gurjar/update_profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.valid) {
          alert("Profile Updated Successfully");
          get("#profileImg").src =
            "https://gurjar-xndl7.ondigitalocean.app" +
            response.data.user.profile_pic;
          get("#profileImg1").src =
            "https://gurjar-xndl7.ondigitalocean.app" +
            response.data.user.profile_pic;
          get("#headName").innerHTML = response.data.user.name;
          get("#profile").value = "";
          get("#password").value = "";
        }
        // console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const logout = () => {
    new_cookies.remove("token", { path: "/" });
    navigate("/");
  };
  const token = new_cookies.get("token");
  useEffect(() => {
    initTE({ Tab });
    if (token) {
      axios
        .post("https://gurjar-xndl7.ondigitalocean.app/gurjar/get_user/", {
          token: token,
        })
        .then((response) => {
          // console.log("response", response);
          if (!response.data.valid) {
            new_cookies.remove("token", { path: "/" });
          } else {
            get("#name").value = response.data.user.name;
            get("#religion").value = response.data.user.religion;
            get("#state").value = response.data.user.state;
            get("#city").value = response.data.user.city;
            get("#village").value = response.data.user.village;
            get("#nationality").value = response.data.user.nationality;
            get("#gender").value = response.data.user.gender;
            get("#gotra").value = response.data.user.gotra;
            get("#blood_group").value = response.data.user.blood_group;
            get("#date_of_birth").value = response.data.user.date_of_birth;
            get("#email").value = response.data.user.email;
            get("#number").value = response.data.user.mobile_number;

            setUser(response.data.user);
            setAvatar(
              "https://gurjar-xndl7.ondigitalocean.app" +
                response.data.user.profile_pic
            );
          }
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen backg mx-auto">
      <div className="flex justify-between items-center px-7 py-2 bg-gray-900 text-gray-50 shadow">
        <div className="font-bold tracking-wider ">Gurjar.</div>

        <button
          onClick={openDropdown}
          className="inline-block h-9 w-9 rounded-full ring-4 ring-transparent hover:ring-slate-800 cursor-pointer active:ring-transparent"
        >
          <img
            id="profileImg1"
            className="border-2 border-indigo-500/75  overflow-hidden rounded-full"
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
                Gurjar
              </div>
              <div
                className="px-4 text-left text-sm text-gray-50"
                role="menuitem"
              >
                Gurjar@gmail.com
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

      <div className="text-black sm:px-5 sm:py-4 xsm:px-5 xsm:py-4 md:px-9 md:py-9 lg:px-9 lg:py-9">
        <div class="min-h-screen mx-auto  justify-center py-5 px-3 shadow rounded-lg  xsm:px-4 sm:px-4">
          <form
            onSubmit={formSubmit}
            className="min-h-screen mx-auto my-auto justify-center py-5 px-3 grid lg:grid-rows-3 lg:grid-cols-4 md:grid-rows-3 md:grid-cols-4 grid-rows-4 grid-cols-1  gap-4"
          >
            <div className=" lg:row-span-3 lg:col-span-1 md:row-span-3 md:col-span-1 row-span-4 col-span-3 ">
              <img
                id="profileImg"
                src={avatar}
                class="border-4 border-indigo-500/75 w-56 h-56 rounded-full mx-auto"
              ></img>
              <tr>
                <td class="px-2 py-2  xsm:px-0 text-black">
                  <input
                    className="flex justify-center items-center "
                    type="file"
                    id="profile"
                  />
                </td>
              </tr>
            </div>

            <div className=" lg:row-span-3 lg:col-span-3 md:row-span-2 md:col-span-3  row-span-4 col-span-3 ">
              <div className="lg:flex justify-between">
                <p id="headName" class="px-2 py-1 xsm:px-0 font-bold text-5xl">
                  {user.name}
                </p>
                <button class=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                  <svg
                    class="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <ImProfile />
                  </svg>
                  <span>Gurjar Card</span>
                </button>
              </div>

              <h6 className="text-gray-500">Gurjar ID: {user.gurjar_id}</h6>
              <h6 className="text-gray-500">Gurjar Points: 1000</h6>
            </div>

            <div className="flex justify-end lg:items-end md:items-end space-x-2 lg:row-span-3 lg:col-span-1 md:row-span-3 md:col-span-1 row-span-4 col-span-3  "></div>

            <div className=" row-span-2 col-span-1"></div>

            <div className="bg-white row-span-3 col-span-3 border-double border-4 border-black rounded-md">
              <ul
                class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0  "
                role="tablist"
                data-te-nav-ref
              >
                <li role="presentation" class="flex-auto text-center">
                  <a
                    href="#tabs-home01"
                    class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    data-te-toggle="pill"
                    data-te-target="#tabs-home01"
                    data-te-nav-active
                    role="tab"
                    aria-controls="tabs-home01"
                    aria-selected="true"
                  >
                    Information
                  </a>
                </li>
                <li role="presentation" class="flex-auto text-center">
                  <a
                    href="#tabs-profile01"
                    class="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    data-te-toggle="pill"
                    data-te-target="#tabs-profile01"
                    role="tab"
                    aria-controls="tabs-profile01"
                    aria-selected="false"
                  >
                    Account
                  </a>
                </li>
              </ul>

              <div class="mb-2 ">
                <div
                  class=" lg:px-5 md:px-5 px-0 hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                  id="tabs-home01"
                  role="tabpanel"
                  aria-labelledby="tabs-home-tab01"
                  data-te-tab-active
                >
                  <div class="grid lg:grid-rows-2 lg:grid-cols-2 md:grid-rows-2 md:grid-cols-2 grid-rows-1 grid-cols-1  text-xl ">
                    <table className="lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2 col-span-1 row-span-2  lg:text-2xl md:text-2xl text-sm ">
                      <tbody>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold mb-5 mr-5">
                            Name:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1  xsm:px-0 text-black mb-5 ">
                            <input id="name" type="text" placeholder="Name" />
                          </td>
                        </tr>

                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Religion:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="Catholic"
                              id="religion"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            State:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7  py-1 xsm:px-0 text-black">
                            <input type="text" placeholder="State" id="state" />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            City:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input type="text" placeholder="City" id="city" />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Village:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="Village"
                              id="village"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="text-2xl  col-span-1 row-span-2 lg:text-2xl md:text-2xl text-sm">
                      <tbody className="">
                        <tr>
                          <td class=" lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Nationality:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="Filipino"
                              id="nationality"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Gender:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="Gender"
                              id="gender"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Gotra:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input type="text" placeholder="Gotra" id="gotra" />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Blood group:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="Blood group"
                              id="blood_group"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Birth date:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1  xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="Birth of Date"
                              id="date_of_birth"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                  id="tabs-profile01"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tab01"
                >
                  <div class=" p-2 grid grid-rows-2 grid-cols-2 text-xl ">
                    <table className="col-span-1 row-span-2 text-2xl lg:text-2xl md:text-2xl text-sm">
                      <tbody>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 px-8  xsm:px-0 text-black-500 font-semibold">
                            Username:
                          </td>
                          <p class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1  xsm:px-0 text-black ">
                            <input
                              id="Username"
                              type="text"
                              placeholder="Gurjar ID"
                            />
                          </p>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Password:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="password"
                              id="password"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0 text-black-500 font-semibold">
                            Email:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="Gurjarweb@gmail.com"
                              id="email"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 px-8 py-1 xsm:px-0  text-black-500 font-semibold">
                            Number:
                          </td>
                          <td class="lg:px-7 lg:py-7 md:px-7 md:py-7 py-1 xsm:px-0 text-black">
                            <input
                              type="text"
                              placeholder="+639666972501"
                              id="number"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end px-3">
                  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold lg:py-2 lg:px-4 md:py-2 md:px-4 py-1 px-2 rounded inline-flex items-center top-0 right-0">
                    <svg
                      class="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <GrDocumentUpdate />
                    </svg>
                    <span onClick={updateProfile} href="#!">
                      Save
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col  w-89 h-50 justify-center p-6 shadow-md rounded-xl sm:px-12  ">
              <img
                src={avatar}
                className="w-32 h-32 mx-auto rounded-full bg-white aspect-square"
              />
              <div className="w-89 h-50 space-y-4 text-center divide-y divide-gray-700">
                <div className="my-2 space-y-1">
                  <h2
                    id="name"
                    className=" text-xl font-semibold sm:text-2xl"
                  ></h2>
                  <p className="px-5 text-xs sm:text-base dark:text-white-400">
                    Gurjar ID: {user.gurjar_id}
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
                      State: {user.state}
                    </p>
                    <p className="px-5 text-xs sm:text-base dark:text-white-400">
                      Country: {user.nationality}
                    </p>
                    <p className="px-5 text-xs sm:text-base dark:text-white-400">
                      City: {user.city}
                    </p>
                    <p className="px-5 text-xs sm:text-base dark:text-white-400">
                      Village: {user.village}
                    </p>
                    <p className="px-5 text-xs sm:text-base dark:text-white-400">
                      Blood group: {user.blood_group}
                    </p>
                    <p className="px-5 text-xs sm:text-base dark:text-white-400">
                      Birth date: {user.date_of_birth}
                    </p>
                    <p className="px-5 text-xs sm:text-base dark:text-white-400">
                      Gotra: {user.gotra}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
