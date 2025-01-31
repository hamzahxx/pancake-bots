import { useState } from "react";

function Company(props) {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    props.onSubmit(companyData);
  }

  return (
    <div className="flex">
      <form
        className="flex flex-col gap-y-4 justify-between items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-white text-black w-56 md:w-72 h-10 px-5 rounded-lg duration-150 focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          className="bg-white text-black w-56 md:w-72 h-10 px-5 rounded-lg duration-150 focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
          type="text"
          name="url"
          placeholder="Company URL"
          onChange={handleChange}
          required
        />
        <textarea
          className="bg-white text-black w-56 md:w-72 min-h-[40px] px-5 py-2 rounded-lg duration-150 focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 resize-none overflow-y-auto grid grid-rows-[min-content] auto-rows-[min-content]"
          placeholder="Company Description (Optional), Character Limit (50)."
          onChange={handleChange}
          maxLength={50}
        />
        <button
          className="bg-green-400 hover:bg-green-300 w-56 md:w-72 h-10 cursor-pointer duration-150 text-black hover:font-bold rounded-lg flex justify-center items-center"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Company;
