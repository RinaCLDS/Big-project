import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paging from "../components/Paging";

const Register = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthDate: "",
    age: "",
    religion: "",
    gotra: "",
    bloodGroup: "",
    nationality: "",
    state: "",
    city: "",
    village: "",
    mobile: "",
    email: "",
    password: "",
    education: "",
    profession: "",
    address: "",
  });

  const formFields = [
    { name: "name", label: "Name" },
    { name: "gender", label: "Gender" },
    { name: "birthDate", label: "Birth Date" },
    { name: "religion", label: "Religion" },
    { name: "gotra", label: "Gotra" },
    { name: "bloodGroup", label: "Blood Group" },
    { name: "nationality", label: "Nationality" },
    { name: "state", label: "State" },
    { name: "city", label: "City" },
    { name: "village", label: "Village" },
    { name: "mobile", label: "Mobile" },
    { name: "education", label: "Education" },
    { name: "profession", label: "Profession" },
    { name: "age", label: "Age" },
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
    { name: "address", label: "Address" },
  ];

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    // Perform registration logic here
    // You can access the form data from the formData state and submit it to your backend or perform any other actions you need.
  };

  const totalPages = 9; // Total number of pages
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
    // Perform any additional logic when the page changes
  };

  const [isGurjar, setisGurjar] = useState(false);
  const gurjarChange = () => setisGurjar(!isGurjar);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] h-[100svh] overflow-hidden">
      {isGurjar ? (
        <div className="flex flex-col justify-between h-full py-10 text-[#111]">
          <div>
            Create Account
            <p>Please login your details</p>
          </div>

          <div className="mt-[-25vh]">
            {formFields.slice(page * 2, page * 2 + 2).map((field) => (
              <div key={field.name}>
                <input
                  className="p-3 my-2 border rounded-lg w-full"
                  type={field.name === "password" ? "password" : "text"}
                  placeholder={field.label}
                  value={formData[field.name]}
                  name={field.name}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="flex justify-between w-full">
              {page > 0 ? <button onClick={previousPage}>Previous</button> : <div></div>}
              {page < Math.ceil(formFields.length / 2) - 1 ? (
                <button className="mx-2" onClick={nextPage}>Next</button>
              ) : (
                <button className="mx-2" onClick={handleRegister}>Register</button>
              )}
            </div>
          </div>

          <div>
            <Paging
              currentPage={page + 1}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center mt-[-25vh]">
          <h2>Are you a Gurjar?</h2>
          <button
            className="border border-black m-2 hover:bg-black hover:text-white"
            onClick={gurjarChange}
          >
            Yes
          </button>
          <button
            className="border border-black m-2 hover:bg-black hover:text-white"
            onClick={() => navigate("/")}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;

// import React, { useState } from 'react';
// import Paging from '../components/Paging';

// const Register = () => {

//   return (
//     <div className="">

//     </div>
//   );
// };

// export default Register;
