import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { BiArrowBack } from "react-icons/bi";
import { domain } from "../data/constant";
const Login = () => {
  const [open, setOpen] = useState(false);
  const get = (element) => document.querySelector(element);
  const new_cookies = new Cookies();
  const currentDate = new Date();
  const expiresDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const navigate = useNavigate();
  const token = new_cookies.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    axios
      .post(domain + "/gurjar/login/", {
        gurjar_id: username.value,
        password: password.value,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.valid) {
          const token = response.data.token;
          new_cookies.set("token", token, { path: "/", expires: expiresDate });
          navigate("/dashboard");
        } else {
          // alert("Invalid Credentials");

          navigate("/dashboard"); //REMOVE AFTER DEVELOPMENT
        }
      })
      .catch((error) => alert(error));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const email = get("#ResetEmail").value;
    await axios
      .post(domain + "/gurjar/change_password/", {
        email: email,
      })
      .then((response) => {
        if (response.data.valid) {
          alert("Password has been sent to your email");
        } else {
          alert("Email does not exist in Gurjar");
        }
      })
      .catch((error) => alert(error));
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const check = async () => {
    await axios
      .post(domain + "/gurjar/get_user/", {
        token: token,
      })
      .then((response) => {
        console.log("response", response);
        if (!response.data.valid) {
          new_cookies.remove("token", { path: "/" });
        } else {
          localStorage.setItem("data", JSON.stringify(response.data));
          navigate("/dashboard");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    check();
    if (open) {
      get(".loginAccount").classList.add("hidden");
      get(".resetPassword").classList.remove("hidden");
    } else {
      get(".loginAccount").classList.remove("hidden");
      get(".resetPassword").classList.add("hidden");
    }
  });

  return (
    <section className="sm:p-25 flex flex-col justify-center" id="contact">
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="flex w-full justify-center h-[70vh]"
      >
        <div className="flex sm:items-center loginAccount">
          <form
            onSubmit={handleSubmit}
            className="max-w-md rounded-lg flex-col p-7 mt-4 sm:border sm:shadow-xl sm:bg-white"
          >
            <h1 className="mt-2 mb-7 text-center text-[#111] text-5xl font-extrabold">
              Gurjar.
            </h1>
            <input
              className="bg-transparent text-black border border-[#999] rounded-md p-3 outline-none 
               w-full placeholder:text-gray focus:border-[#111] transition-all"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="bg-transparent text-black border border-[#999] rounded-md p-3 mt-2 outline-none
         w-full placeholder:text-gray focus:border-[#111] transition-all"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full flex justify-center mt-5 p-3 text-xl border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#555] hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>

            <div className="mt-2">
              <span className="text-black text-xs flex justify-center">
                <a
                  onClick={handleOpen}
                  className="text-blue-600 hover:underline"
                  href="#!"
                >
                  Forgot password?
                </a>
              </span>
              <span className="text-black text-xs flex justify-center">
                <Link className="text-blue-600 hover:underline" to="/register">
                  Sign up.
                </Link>
              </span>
            </div>
          </form>
        </div>

        <motion.div
          variants={fadeIn("top", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="flex w-full justify-center sm:items-center resetPassword hidden"
        >
          <div className="mt-4 p-7 rounded-lg sm:border sm:shadow-xl sm:bg-white h-96">
            <span className="block rounded-full w-7">
              <a href="#!" className="text-black text-2xl" onClick={handleOpen}>
                <BiArrowBack />
              </a>
            </span>
            <div className="mt-10">
              <form action="">
                <p className="text-[#333] text-based mb-1">
                  Enter your email to reset password.
                </p>
                <div className="flex flex-col">
                  <label htmlFor="email">
                    <input
                      id="ResetEmail"
                      name="email"
                      type="email"
                      className="bg-transparent text-black border border-[#999] rounded-md p-3 outline-none 
                    w-full placeholder:text-gray focus:border-[#111] transition-all"
                      placeholder="Enter email address"
                    />
                  </label>

                  <button
                    onClick={handleReset}
                    className="w-full mt-5 py-3 font-medium text-white bg-[#555] hover:bg-[#222] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                      />
                    </svg>

                    <span>Reset password</span>
                  </button>

                  <p className="text-center text-xs mt-1">
                    <Link
                      className="text-blue-600 hover:underline"
                      to="/register"
                    >
                      Sign up.
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Login;
