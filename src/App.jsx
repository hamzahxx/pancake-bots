// Function Imports
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Asset & Pages Imports
import background from "./assets/background.svg";
import Authentication from "./pages/Authentication";
import Company from "./pages/Company";

function App() {
  // User State
  const [userData, setUserData] = useState({});
  const handleUserData = (data) => {
    setUserData(data);
  };
  const { name, email, password, login } = userData;

  // Company State
  const [companyData, setCompanyData] = useState({});
  const handleCompanyData = (data) => {
    setCompanyData(data);
  };

  // Animation Logic
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from("#title", {
        delay: 0.2,
        opacity: 0,
        duration: 0.5,
      });
    },
    { scope: container }
  );
  return (
    <div
      ref={container}
      className="bg-[#0B1120] flex flex-col h-[80vh] md:h-screen items-center justify-center"
    >
      <h1
        id="title"
        className="text-white absolute z-10 top-10 text-4xl font-bold"
      >
        BeyondChats
      </h1>
      <div className="relative z-10">
        {!login && <Authentication onSubmit={handleUserData} />}
        {login && <Company onSubmit={handleCompanyData} />}
      </div>
      <img
        className="min-w-screen absolute bottom-0 lg:top-[-10px] z-[1]"
        src={background}
      />
    </div>
  );
}

export default App;
