import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { BiArrowBack } from "react-icons/bi";

const Login = () => {
  const [open, setOpen] = useState(false);
  const get = (element) => document.querySelector(element);
  const new_cookies = new Cookies();
  const currentDate = new Date();
  const expiresDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const navigate = useNavigate();
  const token = new_cookies.get("token");
  if (token) {
    axios
      .post("https://gurjar-xndl7.ondigitalocean.app/gurjar/get_user/", {
        token: token,
      })
      .then((response) => {
        console.log("response", response);
        if (!response.data.valid) {
          new_cookies.remove("token", { path: "/" });
        } else {
          navigate("/dashboard");
        }
      })
      .catch((error) => console.log(error));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    // console.log(username.value, password.value);
    axios
      .post("https://gurjar-xndl7.ondigitalocean.app/gurjar/login/", {
        gurjar_id: username.value,
        password: password.value,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.valid) {
          const token = response.data.token;
          localStorage.setItem('data', JSON.stringify(response.data))
          new_cookies.set("token", token, { path: "/", expires: expiresDate });
          navigate("/dashboard");
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((error) => alert(error));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const email = get("#ResetEmail").value;
    await axios
      .post("https://gurjar-xndl7.ondigitalocean.app/gurjar/change_password/", {
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
  useEffect(() => {
    if (open) {
      get(".loginAccount").classList.add("hidden");
      get(".resetPassword").classList.remove("hidden");
    } else {
      get(".loginAccount").classList.remove("hidden");
      get(".resetPassword").classList.add("hidden");
    }
  });

  return (
    <section
      className="min-h-screen sm:p-25 flex flex-col justify-center backg"
      id="contact"
    >
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="flex container mx-auto max-w-sm"
      >
        <div className="flex flex-col loginAccount">
          <form
            onSubmit={handleSubmit}
            className="flex-1 place-self-center border border-4 rounded-lg flex flex-col gap-y-6 pb-24 p-6 mt-4 "
          >
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 class="mt-2 text-center text-2xl font-extrabold text-gray-900">
                Login your Gurjar Account
              </h2>
            </div>
            <input
              className="bg-transparent  text-black border-b py-3 outline-none 
               w-full placeholder:text-black focus:border-accent transition-all"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="bg-transparent  text-black border-b outline-none
         w-full placeholder:text-black focus:border-accent transition-all"
              type="password"
              name="password"
              placeholder="Password"
            />
            <span className=" text-black">
              forgot password?{" "}
              <a onClick={handleOpen} className="text-accent" href="#!">
                reset password
              </a>
            </span>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <span className=" text-black">
              New to Gurjar? click here to{" "}
              <Link className="text-accent" to="/register">
                Sign up
              </Link>
            </span>
          </form>
        </div>

        <motion.div
          variants={fadeIn("top", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 text-black resetPassword hidden"
        >
          <span className=" text-black">
            <a href="#!" className="text-accent" onClick={handleOpen}>
              <BiArrowBack />
            </a>
          </span>
          <h1 class="text-4xl font-medium">Reset password</h1>
          <p class="text-slate-500">Fill up the form to reset the password</p>

          <form action="" class="my-10">
            <div class="flex flex-col space-y-5">
              <label for="email">
                <p class="font-medium text-slate-700 pb-2">Email address</p>
                <input
                  id="ResetEmail"
                  name="email"
                  type="email"
                  class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>

              <button
                onClick={handleReset}
                class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>

                <span>Reset password</span>
              </button>
              <p class="text-center">
                Not registered yet?{" "}
                <a
                  href="#"
                  class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>
                    <Link className="text-accent" to="/register">
                      Register now
                    </Link>{" "}
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Login;
