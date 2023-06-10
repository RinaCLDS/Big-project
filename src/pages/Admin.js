import React, { useEffect, useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import { useGetGurjarUsersQuery, useDeleteGurjarUserMutation } from "../state/api";
import { domain } from "../data/constant";
import EditProfile from "../modal/EditProfile";
import Cookies from "universal-cookie";

function Admin() {
  const { data, error, isLoading } = useGetGurjarUsersQuery();
  const [newUser, setNewUser] = useState({});
  const [deleteUser, { isLoading: isDeleting }] = useDeleteGurjarUserMutation();
  const get = (element)=> document.querySelector(element);
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
      console.error('Error deleting user:', error);
    });
  }
  const userdata = (state, id)=>{
    setEditProfile(state);
    const user = data.find((user)=> user.id === id);
    
    setNewUser(user);
  }

  const [showEditProfile, setEditProfile] = useState(false);
  const [newshow, setNewShow] = useState(false);
  const onclickuser = () =>{
    const forms = get('form')
    forms.name.value = newUser.name;
    console.log(newUser.value)
  }
  console.log(newshow)
  useEffect(() => {
    if (!isLoading){
      // Save data to local storage
      console.log(111)
      localStorage.setItem('gurjar_users', JSON.stringify(data));
    }
  },[data]);
  return (
    <div class="overflow-x-auto">
      <TopNavigationBar />
      {
        isDeleting && (
          <h1 style={{textAlign:'center', fontSize:'4rem', padding: '5rem 5rem'}}>W8 while deleting</h1>
        )
      }
      <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div class="w-full lg:w-5/6">
          <div class="bg-white shadow-md rounded my-6">
            <table class="min-w-max w-full table-auto">
              <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Gurjar ID</th>
                  <th class="py-3 px-6 text-left">User</th>
                  <th class="py-3 px-6 text-left">Email</th>
                  <th class="py-3 px-6 text-left">mobile number</th>
                  <th class="py-3 px-6 text-left">State</th>
                  <th class="py-3 px-6 text-left">Date of birth</th>
                  <th class="py-3 px-6 text-left">religion</th>
                  <th class="py-3 px-6 text-center">Status</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                {
                  !isLoading && (
                    data.map((user) => (
                      <>
                      <tr id={`gurjar_user_${user.id}`} class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="font-medium">{user.gurjar_id}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <div class="mr-2">
                              <img
                                class="w-6 h-6 rounded-full"
                                src={domain+user.profile_pic}
                              />
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="font-medium">{user.email}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="font-medium">{user.mobile_number}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="font-medium">{user.state}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="font-medium">{user.date_of_birth}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="font-medium">{user.religion}</span>
                          </div>
                        </td>
                      
                        <td class="py-3 px-6 text-center">
                          <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                            Active
                          </span>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex item-center justify-center">
                            <div  class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            <div onClick={()=>userdata(true, user.id)} class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                            <div onClick={()=>handleDelete(user.id)} class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                      </>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        showEditProfile && (
          <EditProfile
              trigger={setEditProfile}
              newUser={newUser}
            />
        )
      }
      
    </div>
  );
}

export default Admin;
