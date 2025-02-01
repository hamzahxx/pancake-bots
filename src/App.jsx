// Function Imports
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Asset & Pages Imports
import background from "./assets/background.svg";
import Authentication from "./pages/Authentication";
import Company from "./pages/Company";

function App() {
  // User data state
  const [userData, setUserData] = useState({});
  const { name, email, login } = userData;

  const handleUserData = (data) => {
    gsap.to("#component-container", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setUserData(data);
        gsap.to("#component-container", {
          opacity: 1,
          duration: 0.3,
        });
      },
    });
  };

  // Company data state
  const [companyData, setCompanyData] = useState({});
  const handleCompanyData = (data) => {
    setCompanyData(data);
  };

  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from("#title", {
        delay: 0.3,
        opacity: 0,
        duration: 0.5,
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(".nav-user", {
        opacity: 0,
        x: 20,
        duration: 0.5,
      });
    },
    { dependencies: [name, email], scope: container }
  );

  return (
    <div className="bg-[#0b1120]" ref={container}>
      <div className="relative z-10 flex justify-around items-center py-4">
        <h1 id="title" className="text-white relative z-10 text-4xl font-bold">
          BeyondChats
        </h1>

        {(name || email) && (
          <h1 className="nav-user hidden md:block text-white relative z-10 text-3xl">
            {name || email}
          </h1>
        )}
      </div>
      <div className="flex flex-col h-[80vh] items-center justify-center">
        <div className="relative z-10" id="component-container">
          {!login ? (
            <Authentication onSubmit={handleUserData} />
          ) : (
            <Company onSubmit={handleCompanyData} />
          )}
        </div>
        <img
          className="min-w-screen absolute bottom-0 lg:top-[-10px] z-[1]"
          src={background}
        />
      </div>
    </div>
  );
}

export default App;
