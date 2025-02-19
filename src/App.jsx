// Function Imports
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Asset & Pages Imports
import Authentication from "./pages/Authentication";
import Company from "./pages/Company";
import IntegrationSection from "./pages/Integration";

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
  const { url, isCompany } = companyData;
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
    <div className="bg-[#0b1120] h-full" ref={container}>
      <div className="flex justify-around h-[20vh] items-center py-4">
        <h1 id="title" className="text-white text-4xl font-bold">
          BeyondChats
        </h1>

        {(name || email) && (
          <h1 className="nav-user hidden md:block text-white text-3xl">
            {name || email}
          </h1>
        )}
      </div>
      <div className="flex flex-col h-full items-center justify-center">
        <div id="component-container">
          {!login && (
            <div className="h-[85vh] md:h-[80vh] pb-40 md:pb-30 flex items-center justify-center">
              <Authentication onSubmit={handleUserData} />
            </div>
          )}
          {login && !isCompany && (
            <div className="h-[full] pb-30">
              <Company onSubmit={handleCompanyData} />
            </div>
          )}
          {login && isCompany && (
            <div className="h-full">
              <IntegrationSection companyURL={url} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
