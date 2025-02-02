import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { FaCopy, FaRegEnvelope, FaCheck } from "react-icons/fa";
import ChatInterface from "../components/ChatIntereface";

function IntegrationSection(props) {
  const [showIntegrationOptions, setShowIntegrationOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testIntegrationStatus, setTestIntegrationStatus] = useState("pending");
  const [email, setEmail] = useState("");

  const integrationModalRef = useRef(null);
  const testModalRef = useRef(null);
  const containerRef = useRef(null);

  const integrationCode = `<script src="https://cdn.beyondchats.com/chatbot.js" data-api-key="YOUR_API_KEY"></script>`;

  const handleIntegrationModalClose = () => {
    gsap.to(integrationModalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setShowIntegrationOptions(false),
    });
  };

  const handleTestModalClose = () => {
    gsap.to(testModalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setTestIntegrationStatus("pending"),
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".integration-button-1", { opacity: 0, y: 20, duration: 0.3 });
    tl.from("#frame", { opacity: 0, y: 20, duration: 0.3 });
    tl.from(".chatbot-button", { opacity: 0, y: 20, duration: 0.3 });

    tl.from(".integration-button", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.3,
    });
  });

  useGSAP(
    () => {
      if (showIntegrationOptions) {
        gsap.fromTo(
          integrationModalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
      }
    },
    { dependencies: [showIntegrationOptions] }
  );

  useGSAP(
    () => {
      if (testIntegrationStatus !== "pending") {
        gsap.fromTo(
          testModalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
      }
    },
    { dependencies: [testIntegrationStatus] }
  );

  const runConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleTestIntegration = () => {
    // Simulate integration check
    setTestIntegrationStatus("checking");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      gsap.to(testModalRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setTestIntegrationStatus(isSuccess ? "success" : "failed");
          gsap.to(testModalRef.current, { opacity: 1, duration: 0.1 });
          if (isSuccess) runConfetti();
        },
      });
    }, 2000);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(integrationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmailInstructions = () => {
    console.log("Sending instructions to:", email);
    setShowIntegrationOptions(false);
  };

  return (
    <div ref={containerRef} className="p-4 mx-auto">
      <div className="mb-8 flex flex-col items-center">
        <button className="integration-button-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors w-[83vw] md:w-full mb-4">
          Test Chatbot
        </button>
        <div id="frame" className="border rounded-lg p-4">
          <iframe
            // eslint-disable-next-line react/prop-types
            src={props.companyURL}
            className="w-[83vw] h-[96vh] border-none rounded-t-lg overflow-hidden"
            scrolling="no"
            title="Chatbot Preview"
          />
          <div className="chatbot-button relative">
            <ChatInterface />
          </div>
          <div className="bg-gray-800 p-2 text-center rounded-b-lg">
            <a href="#feedback" className="text-blue-400 hover:text-blue-300">
              Chatbot not working as intended? Share feedback
            </a>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 m-3 mb-8">
        <button
          className="integration-button bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          onClick={() => setShowIntegrationOptions(true)}
        >
          Integrate on Your Website
        </button>

        <button
          className="integration-button bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleTestIntegration}
        >
          Test Integration
        </button>
      </div>
      {showIntegrationOptions && (
        <div
          ref={integrationModalRef}
          className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-white">
              Integration Options
            </h3>

            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-white">Copy-Paste Code</h4>
              <div className="bg-gray-700 p-4 rounded relative pr-11">
                <pre className="text-sm overflow-x-auto text-white">
                  {integrationCode}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 text-gray-300 hover:bg-gray-600 rounded"
                >
                  {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-white">
                Email Instructions
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Developer's email"
                  className="bg-gray-700 text-white p-2 rounded flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={sendEmailInstructions}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                  <FaRegEnvelope />
                </button>
              </div>
            </div>

            <button
              className="mt-4 w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              onClick={handleIntegrationModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {testIntegrationStatus !== "pending" && (
        <div
          ref={testModalRef}
          className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
            {testIntegrationStatus === "checking" ? (
              <div className="animate-pulse text-xl text-white">
                Checking integration...
              </div>
            ) : testIntegrationStatus === "success" ? (
              <>
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Integration Successful!
                </h2>
                <div className="grid gap-4 mb-6">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg duration-150 hover:bg-blue-700">
                    Explore Admin Panel
                  </button>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg duration-150 hover:bg-green-700">
                    Start Talking to Your Chatbot
                  </button>
                </div>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="text-white duration-150 hover:text-blue-400"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-white duration-150 hover:text-blue-400"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="text-white duration-150 hover:text-blue-400"
                  >
                    LinkedIn
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="text-4xl mb-4">⚠️</div>
                <h2 className="text-xl mb-4">Integration Not Detected</h2>
                <p className="mb-4">Please try again or contact support</p>
                <button
                  className="bg-gray-600 px-6 py-3 rounded-lg hover:bg-gray-700"
                  onClick={handleTestModalClose}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IntegrationSection;
