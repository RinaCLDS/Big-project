import React, { useEffect, useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import { useGetGurjarUsersQuery, useDeleteGurjarUserMutation } from "../state/api";
import { domain } from "../data/constant";
import EditProfile from "../modal/EditProfile";
import Cookies from "universal-cookie";
import axios from "axios";
import SendMessage from "../modal/SendMessage";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { data, error, isLoading } = useGetGurjarUsersQuery();
  const [newUser, setNewUser] = useState({});
  const [deleteUser, { isLoading: isDeleting }] = useDeleteGurjarUserMutation();
  const get = (element) => document.querySelector(element);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    valid: true,
    user: {
      name: "Gabryel Ardy Echavez",
      profile_pic: "/media_cdn/profile_images/profile/avatar1.png",
      nationality: "philippines",
      state: "rizal",
      city: "antipolo",
      village: "dela paz",
      gotra: "A",
      blood_group: "A",
      date_of_birth: "2000",
      email: "myfluffycy@gmail.com",
      password: "sample",
      mobile_number: "09666972501",
      religion: "catholic",
    },
  });
  const handleDelete = (id) => {
    deleteUser(id)
      .unwrap() // Assuming you have configured unwrap() in your API setup
      .then(() => {
        const element = document.getElementById(`gurjar_user_${id}`);
        if (element) {
          element.remove();
          alert("User Deleted Successfully");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting user:", error);
      });
  };
  const userdata = (state, id) => {
    setEditProfile(state);
    const user = data.find((user) => user.id === id);

    setNewUser(user);
  };

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [showSendMessage, setSendMessage] = useState(false);
  const handleOnClosed = () => setSendMessage(false);

  const [showEditProfile, setEditProfile] = useState(false);
  const [newshow, setNewShow] = useState(false);
  const onclickuser = () => {
    const forms = get("form");
    forms.name.value = newUser.name;
    console.log(newUser.value);
  };
  console.log(newshow);
  const check = async () => {
    const new_cookies = new Cookies();
    const token = new_cookies.get("token");

    await axios
      .post(domain + "/gurjar/get_user/", {
        token: token,
      })
      .then((response) => {
        if (!response.data.valid) {
          new_cookies.remove("token", { path: "/" });
          navigate("/");
        } else {
          localStorage.setItem("data", JSON.stringify(response.data));
          setUserData(response.data);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    check();
    if (!isLoading) {
      // Save data to local storage
      console.log(111);
      localStorage.setItem("gurjar_users", JSON.stringify(data));
    }
  }, [data]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data
    ? data.filter(
      (user) =>
        user &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.mobile_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.state.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : [];

  const rowsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  // Get the current page's data
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMultipleSend = () => {
    // Perform send operation to selected users here
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("Selected Users:", selectedUsers);

    const selectedEmails = selectedUsers.map((userId) => {
      const user = data.find((user) => user.id === userId);
      return user.email;
    });

    const emailsString = selectedEmails.join(", ");
    console.log("Selected Emails:", emailsString);

    // Update the state or perform any other logic with the selected emails
  };

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelect = (userId) => {
    const isSelected = selectedUsers.includes(userId);

    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="overflow-x-auto py-5">
      <TopNavigationBar data={userData} />
      {isDeleting && (
        <h1 style={{ textAlign: "center", fontSize: "4rem", padding: "5rem 5rem" }}>
          W8 while deleting
        </h1>
      )}
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden py-7 px-3">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <div className="flex items-center justify-end px-6 py-4">
              <div className="w-1/3 text-right sm:py-3 md:py-3 ">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => setNewShow(true)}
                >
                  Add User
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2 "
                  onClick={() => setSendMessage(true)}
                  disabled={selectedUsers.length === 0}
                >
                  Send Message to multiple
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Gurjar ID</th>
                    <th className="py-3 px-6 text-left">User</th>
                    <th className="py-3 px-6 text-left">Email</th>

                    <th className="py-3 px-6 text-left">Mobile Number</th>
                    <th className="py-3 px-6 text-left">State</th>
                    <th className="py-3 px-6 text-left">Date of Birth</th>
                    <th className="py-3 px-6 text-left">Religion</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                    <th className="py-3 px-6 text-center">Select</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {!isLoading &&
                    currentData.map((user) => (
                      <tr
                        id={`gurjar_user_${user.id}`}
                        className="border-b border-gray-200 hover:bg-gray-100"
                        key={user.id}
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{user.gurjar_id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={domain + user.profile_pic}
                                alt={user.name}
                              />
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{user.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{user.mobile_number}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{user.state}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{user.date_of_birth}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{user.religion}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="bg-green-200 text-black-600 py-1 px-3 rounded-full text-xs">
                            Online
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              onClick={() => userdata(true, user.id)}
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                            <div
                              onClick={() => handleDelete(user.id)}
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                            <div
                              onClick={() => setSendMessage(true)}
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M20 6V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6C4 4.9 4.9 4 6 4H18ZM8 9L12 12.5L16 9M16 14H8"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserSelect(user.id)}
                                className="form-checkbox text-blue-500 h-4 w-4"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-center m-4">
            <nav className="flex items-center">
              <button className="px-3 py-1 border border-gray-300 rounded-md mr-1"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border border-gray-300 rounded-md mx-1 ${currentPage === index + 1 ? "bg-gray-200" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 border border-gray-300 rounded-md ml-1"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div >
      {
        showEditProfile && (
          <EditProfile onClose={() => setEditProfile(false)} user={newUser} />
        )
      }

      <SendMessage
        onClosed={handleOnClosed}
        visible={showSendMessage}
        selectedEmails={selectedUsers.map((userId) => {
          const user = data.find((user) => user.id === userId);
          return user.email;
        })}
      />
    </div >
  );
}

export default Admin;
