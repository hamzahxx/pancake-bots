import { useState } from "react";
import googleIcon from "../assets/google-icon.svg";

const AuthComponent = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
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
    // Handle form submission logic here
    if (showLoginForm) {
      console.log("Login form submitted");
    } else if (showSignupForm) {
      console.log("Signup form submitted");
    }
  };

  return (
    <div className="auth-container">
      {!showLoginForm && !showSignupForm && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              className="w-56 md:w-26 h-10 bg-blue-500 text-white rounded-lg"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="w-56 md:w-26 h-10 bg-blue-500 text-white rounded-lg"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </div>
          <a
            className="bg-white text-black w-56 h-10 rounded-lg flex justify-center items-center gap-2"
            href="https://google.com"
            onClick={handleContinueWithGoogle}
          >
            <img className="h-6 w-auto" src={googleIcon} />
            Continue with Google
          </a>
        </div>
      )}

      {showLoginForm && (
        <div className="flex">
          <form
            className="flex flex-col gap-y-4 justify-between items-center"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-white text-black w-56 h-10 px-5 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
              type="email"
              placeholder="Email"
              required
            />
            <div className="h-10">
              <input
                className="bg-white text-black w-56 h-10 px-5 pr-15 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute my-1 right-1 bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              className="bg-green-400 hover:bg-green-300 duration-150 text-black hover:font-bold w-56 h-10 rounded-lg flex justify-center items-center"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {showSignupForm && (
        <div className="flex">
          <form
            className="flex flex-col gap-y-4 justify-between items-center"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-white text-black w-56 h-10 px-5 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
              type="name"
              placeholder="Name"
              required
            />
            <input
              className="bg-white text-black w-56 h-10 px-5 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
              type="email"
              placeholder="Email"
              required
            />
            <div className="h-10">
              <input
                className="bg-white text-black w-56 h-10 px-5 pr-15 rounded-lg duration-150 focus:invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute my-1 right-1 bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              className="bg-green-400 hover:bg-green-300 duration-150 text-black hover:font-bold w-56 h-10 rounded-lg flex justify-center items-center"
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
