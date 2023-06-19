import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paging from "../components/Paging";
import { FaArrowLeft } from "react-icons/fa";
import bg from "../images/background.png";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import data from "../data/dataset.json";
import "react-phone-input-2/lib/style.css";
import gotras from "../data/gotras.json";
import { useCreateUserMutation } from "../state/api";
const Register = () => {
  const [createUser, { isLoading, isSuccess, isError, error }] = useCreateUserMutation();
  
  const get = (element) => document.querySelectorAll(element)
  const defaultValue = ['Country', 'Gender']
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gotra: "",
    birthDate: "",
    mobile: "",
    email: "",

    country: "",
    state: "",
    city: "",
    village: "",
    bloodGroup: "",
    gender: "",
    religion: "",
    education: "",
    profession: "",

    password: "",
    confirmPassword: "",
    verCode: "",
  });

  const formFields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "gotra", label: "Gotra" },
    { name: "birthDate", label: "Birth Date" },
    { name: "mobile", label: "Mobile" },
    { name: "email", label: "Email" },


    { name: "country", label: "Country" },
    { name: "state", label: "State" },
    { name: "city", label: "City" },
    { name: "village", label: "Village" },
    { name: "bloodGroup", label: "Blood Group" },
    { name: "gender", label: "Gender" },
    { name: "religion", label: "Religion" },
    { name: "education", label: "Education" },
    { name: "profession", label: "Profession" },

    { name: "password", label: "Password" },
    { name: "confirmPassword", label: "Confirm Password" },
    { name: "verCode", label: "Verification Code" },
  ];

  const nextPage = () => {
    const nextPageIndex = page + 1;
    const nextField1 = formFields[nextPageIndex * 2];
    const nextField2 = formFields[nextPageIndex * 2 + 1];

    if (nextField1 && nextField1.name) {
      setFormData((prevData) => ({
        ...prevData,
        [nextField1.name]: prevData[nextField1.name] || "",
      }));
    }

    if (nextField2 && nextField2.name) {
      setFormData((prevData) => ({
        ...prevData,
        [nextField2.name]: prevData[nextField2.name] || "",
      }));
    }

    setPage(nextPageIndex);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

console.log(formData)

  const handleRegister = () => {
    const userRegisterData = {
      name: formData.firstName + " " + formData.lastName,
      religion: formData.religion,
      gender: formData.gender,
      state: formData.state,
      city: formData.city,
      village: formData.village,
      gotra: formData.gotra,
      blood_group: formData.bloodGroup,
      date_of_birth: formData.birthDate,
      mobile_number: formData.mobile,
      email: formData.email,
      education: formData.education,
      profession: formData.profession,
      password: formData.password,
      

    }
    console.log(userRegisterData)
    createUser(userRegisterData)
    // console.log(isSuccess, isError, error)
    alert('User Registered Successfully. Please check your email for your username and password.')
    // Perform registration logic here
    // You can access the form data from the formData state and submit to your backend or perform any other actions you need.
  };

  const totalPages = 3; // Total number of pages
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
    // Perform any additional logic when the page changes
  };


  const [isFormComplete, setIsFormComplete] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    // Check if all fields are filled out
    const isFormComplete =
      formData.country !== "" &&
      formData.state !== "" &&
      formData.city !== "" &&
      formData.village !== "" &&
      formData.bloodGroup !== "" &&
      formData.gender !== "" &&
      formData.education !== "" &&
      formData.profession !== "";

    setIsFormComplete(isFormComplete);
  };

  const isCurrentPageFilled = () => {
    const currentPageFields = formFields.slice(page * 2, page * 2 + 2);
    return currentPageFields.every((field) => {
      const fieldValue = formData[field.name];
      return fieldValue && fieldValue.trim() !== '';
    });
  };

  useEffect(() => {
    const progressValue = ((page * 1) / totalPages) * 100;
    get(".progress-bar").forEach((el) => {
      el.style.width = `${progressValue}%`;
    });
  }, [page, totalPages]);


  const [isGurjar, setisGurjar] = useState(false);
  const gurjarChange = () => setisGurjar(!isGurjar);



  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
  }


  const [isHover, setIsHover] = useState(false);
  const handleMouseEntered = () => setIsHover(true);

  const handleMouseLeaved = () => {
    setIsHover(false);
  }

  const [isYesClicked, setIsYesClicked] = useState(false);

  const handleYesClicked = () => {
    setIsYesClicked(true);
  };

  const handleNextClick = () => {
    // Handle the next button click action
  };
  const name1 = data.map(item => item.name)
  console.log(name1)


  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  useEffect(() => {
    if (Object.keys(state).length === 0) {
      setState(data[0]);
      setCity(data[0].states[0]);
    }
  }, [state]);
  const stateChange = (e) => {
    setState(data[e.target.selectedIndex]);
  };
  const cityChange = (e) => {
    setCity(state.states[e.target.selectedIndex]);
  };

  return (
    <div className="flex items-center justify-between h-screen ">
      <div className="hidden sm:flex flex-col h-full w-1/2 bg-[#e7eff1]">
        <div className="flex items-center justify-center h-full">
          <img
            src={bg}
            className="object-contain h-full w-full"
            loading="lazy"
            alt="Gurjar person"
          />
        </div>
      </div>
      <div className="sm:border sm:w-200 sm:p-5 sm:w-[50vw] flex flex-col sm:mx-0 mx-auto justify-center h-full sm:bg-white sm:rounded-lg z-10">
        {isGurjar ? (
          <div className="flex flex-col justify-between w-full max-w-[1000px] h-full py-10 text-[#111] px-10">
            <div className="w-full  sm:fixed bottom-0  ">
              <div className="progress-bar  h-5 bg-[#47fb86] w-0 "></div>
            </div>

            <div className="mx-auto w-full mb-20 ">
              {page === 0 && (
                <>
                  <h2 className="text-4xl font-extrabold">Create Account</h2>
                  <p className="text-md text-[#888] font-semibold mb-20">
                    Building Gurjar community
                  </p>
                  <div className="grid grid-cols-2 gap-4 ">
                    <input
                      className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                      type="text"
                      required
                      placeholder="First Name"
                      value={formData.firstName}
                      name="firstName"
                      onChange={handleChange}
                    />
                    <input
                      className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                      type="text"
                      required
                      placeholder="Last Name"
                      value={formData.lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                    <select
                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.gotra}
                      name="gotra"
                      onChange={handleChange}
                    >
                      <option value="">Gotra group</option>
                      {gotras.map((item, index) => (
                        <option key={index}>{item.name}</option>
                      ))}
                    </select>
                    <input
                      className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                      type="date"
                      required
                      placeholder="Date of Birth"
                      value={formData.birthDate}
                      name="birthDate"
                      onChange={handleChange}
                    />

                    <input
                      className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                      type="tel"
                      required
                      placeholder="Phone Number"
                      pattern="[0-9]{11}"
                      value={formData.mobile}
                      name="mobile"
                      onChange={handleChange}
                    />
                    <input
                      className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                    />

                    <button
                      className="w-full max-w-md justify-center mt-5 p-3 text-xl border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B77FB] hover:bg-[#0853AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => navigate("/")}
                    >
                      Back
                    </button>


                    <button
                      className={`w-full max-w-md justify-center mt-5 p-3 text-xl border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B77FB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!isCurrentPageFilled()
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[#0853AF]'
                        }`}
                      onClick={nextPage}
                      disabled={!isCurrentPageFilled()}
                    >
                      Next
                    </button>

                  </div>
                </>
              )}




              {page === 1 && (
                <>
                  <h2 className="text-4xl font-extrabold ">Create Account</h2>
                  <p className="text-md text-[#888] font-semibold mb-20">
                    Building Gurjar community
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-10">

                    <select
                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.country}
                      name="country"
                      onChange={(event) => {
                        stateChange(event);
                        handleChange(event);
                      }}

                    >
                      {data.map((item, index) => (
                        <option key={index}>{item.name}</option>
                      ))}
                    </select>
                    <select

                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.state}
                      name="state"
                      onChange={(event) => {
                        cityChange(event);
                        handleChange(event);
                      }}
                    >
                      {Object.keys(state).length === 0
                        ? data[0].states.map((item, index) => (
                          <option key={index}>{item.name}</option>
                        ))
                        : state.states.map((item, index) => (
                          <option key={index}>{item.name}</option>
                        ))}
                    </select>
                    <select

                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.city}
                      name="city"
                      onChange={handleChange}
                    >
                      {Object.keys(state).length === 0
                        ? ""
                        : city.cities.map((item, index) => (
                          <option key={index}>{item.name}</option>
                        ))}
                    </select>
                    <input
                      className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                      type="text"
                      required
                      placeholder="Village"
                      value={formData.village}
                      name="village"
                      onChange={handleChange}
                    />

                    <select

                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.bloodGroup}
                      name="bloodGroup"
                      onChange={handleChange}
                    >
                      <option value="">Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                    <select

                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.gender}
                      name="gender"
                      onChange={handleChange}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <select

                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.education}
                      name="education"
                      onChange={handleChange}
                    >
                      <option value="">Education</option>
                      <option value="Under Graduate" >Under Graduate </option>
                      <option value="Diploma" > Diploma</option>
                      <option value="Graduate" >Graduate</option>
                      <option value="Engineering Graduate" >Engineering Graduate</option>
                      <option value="LLB" >LLB</option>
                      <option value="Post Graduate" >Post Graduate</option>
                      <option value="PHD" >PHD</option>
                      <option value="BDS" >BDS</option >
                      <option value="MBBS" >MBBS</option >
                      <option value="MS" >MS</option >
                    </select >
                    <select

                      className="form-select p-3 my-2 border rounded-lg w-full focus:border-black"
                      value={formData.profession}
                      name="profession"
                      onChange={handleChange}
                    >
                      <option value="">profession</option>
                      <option value="formData.Advocate" >Advocate</option >
                      <option value="Sportsman" >Sportsman</option >
                      <option value="Doctor" >Doctor</option >
                      <option value="Government Job" >Government Job</option >
                      <option value="Private Job" >Private Job</option >
                      <option value="Property Dealer" >Property Dealer</option >
                      <option value="Milk Man" >Milk Man</option >
                      <option value="Driver" >Driver</option >
                      <option value="Farmer" >Farmer</option >
                      <option value="Politician" >Politician</option >
                      <option value="Business" >Business</option >
                    </select >
                  </div >
                  <div className="grid grid-cols-2 gap-4 ">
                    <button
                      onClick={previousPage}
                      className="w-full max-w-md justify-center mt-5 p-3 text-xl border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B77FB] hover:bg-[#0853AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back
                    </button>
                    <button
                      className={`w-full max-w-md justify-center mt-5 p-3 text-xl border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B77FB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      onClick={nextPage}
                      disabled={(
                        !formData.country &&
                        !formData.state &&
                        !formData.city &&
                        !formData.village &&
                        !formData.bloodGroup &&
                        !formData.gender &&
                        !formData.education &&
                        !formData.profession
                      )
                      }
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {
                page === 2 && (
                  <>
                    <h2 className="text-4xl font-extrabold ">Create Account</h2>
                    <p className="text-md text-[#888] font-semibold mb-20">
                      Building Gurjar community
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                      <input
                        className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                        type="password"

                        required
                        placeholder="Password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                      />

                      <input
                        className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                        type="password"

                        required
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                      />

                      <div >

                        <input
                          className="form-input p-3 my-2 border rounded-lg w-full focus:border-black caret-[#111]"
                          type="text"

                          required
                          placeholder="Enter Verification Code"
                          value={formData.verCode}
                          name="verCode"
                          onChange={handleChange}
                        />
                        <span className="mt-2 font-semibold text-sm flex ">
                          <a className="text-[#0B77FB] hover:underline" href="#!">
                            Didn't receive verification code? Resend again
                          </a>
                        </span>
                      </div>

                    </div>
                    <div className="grid grid-cols-2 gap-4 ">

                      <button className="w-full max-w-md justify-center mt-5 p-3 text-xl border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B77FB] hover:bg-[#0853AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={previousPage}>Back</button>


                      <button
                        className="w-full max-w-md justify-center mt-5 p-3 text-xl border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B77FB] hover:bg-[#0853AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleRegister}
                        disabled={!isCurrentPageFilled()}
                      >
                        Register
                      </button>

                    </div>

                  </>

                )
              }

            </div >

            <div >
              <Paging
                currentPage={page + 1}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </div >
        ) : (
          <div className="flex flex-col justify-center mt-[-25vh] px-10">

            <div className="mb-20">
              <h2 className="text-4xl font-extrabold">Create Account</h2>
              <p className="text-md text-[#888] font-semibold">
                Building Gurjar community
              </p>
            </div>
            <h2 className="text-4xl font-extrabold">Are you a Gurjar?</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`flex w-full m-2 p-2 border border-black rounded-lg hover:bg-[#47fb86] hover:text-black relative ${isYesClicked ? "bg-[#47fb86]" : ""
                  }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleYesClicked}
              >
                {isHovered && (
                  <span className="absolute right-2 text-white">
                    <FaCheck size={30} />
                  </span>
                )}
                {isYesClicked && (
                  <span className="absolute right-2 text-white">
                    <FaCheck size={30} />
                  </span>
                )}
                Yes
              </button>

              <button
                className="flex w-full m-2 p-2 border border-black rounded-lg hover:bg-red-500 hover:text-black relative"
                onClick={() => navigate("/")}
                onMouseEnter={handleMouseEntered}
                onMouseLeave={handleMouseLeaved}
              >
                {isHover && (
                  <span className="absolute right-2  text-white">
                    <GiCancel size={30} />
                  </span>
                )}
                No
              </button>

              <button
                className={`w-full max-w-md justify-center}`}

              >

              </button>
              <div className="mt-20">
                <button
                  className={`w-full max-w-md justify-center mt-5 p-3 text-xl border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B77FB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!isYesClicked ? "opacity-50 cursor-not-allowed" : "hover:bg-[#0853AF]"
                    }`}
                  onClick={gurjarChange}
                  disabled={!isYesClicked}
                >
                  Next
                </button>

              </div>
            </div>
          </div>
        )
        }
      </div >
    </div >
  );
};

export default Register;
