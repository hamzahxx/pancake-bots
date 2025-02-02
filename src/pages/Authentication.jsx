import { useState, useRef } from "react";
import googleIcon from "../assets/google-icon.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AuthComponent = (props) => {
  const [activeForm, setActiveForm] = useState("initial");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    login: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const containerRef = useRef(null);
  const ANIMATION_DURATION = 0.3;

  function handleFormChange(form) {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -10,
      ease: "power1.inOut",
      duration: ANIMATION_DURATION,
      onComplete: () => {
        setActiveForm(form);
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
            duration: ANIMATION_DURATION,
          }
        );
      },
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleContinueWithGoogle = () => {
    // Handle Google authentication logic here
    console.log("Continue with Google");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    props.onSubmit(formData);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(containerRef.current, {
        delay: 0.5,
        opacity: 0,
        duration: ANIMATION_DURATION,
      });
    },
    { scope: containerRef }
  );
  return (
    <div className="auth-container" ref={containerRef}>
      {activeForm === "initial" && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              className="w-56 md:w-34 h-10 cursor-pointer duration-150 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              onClick={() => handleFormChange("login")}
            >
              Login
            </button>
            <button
              className="w-56 md:w-34 h-10 cursor-pointer duration-150 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              onClick={() => handleFormChange("signup")}
            >
              Sign Up
            </button>
          </div>
          <div className="h-0.5 w-full bg-[#E0F2FE]"></div>
          <a
            className="bg-white text-black w-56 md:w-72 h-10 duration-150 rounded-lg flex justify-center items-center gap-2"
            href="https://google.com"
            onClick={handleContinueWithGoogle}
          >
            <img className="h-6 w-auto" src={googleIcon} />
            Continue with Google
          </a>
        </div>
      )}

      {(activeForm === "login" || activeForm === "signup") && (
        <div className="flex">
          <form
            className="flex flex-col gap-y-4 justify-between items-center"
            onSubmit={handleSubmit}
          >
            {activeForm === "signup" && (
              <input
                className="bg-white text-black w-56 md:w-72 h-10 px-5 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                type="name"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                required
              />
            )}
            <input
              className="bg-white text-black w-56 md:w-72 h-10 px-5 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <div className="h-10">
              <input
                className="bg-white text-black w-56 md:w-72 h-10 px-5 pr-15 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                minLength={8}
                required
              />
              <button
                type="button"
                className="absolute my-1 right-1 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              className="bg-green-400 hover:bg-green-300 w-56 md:w-72 h-10 cursor-pointer duration-150 text-black hover:font-bold rounded-lg flex justify-center items-center"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
