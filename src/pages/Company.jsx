import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Dummy Data
import dummy1 from "../assets/dummy/dummy-data-1.png";
import dummy2 from "../assets/dummy/dummy-data-2.png";
import dummy3 from "../assets/dummy/dummy-data-3.png";
import dummy4 from "../assets/dummy/dummy-data-4.png";
import dummy5 from "../assets/dummy/dummy-data-5.png";
import dummy6 from "../assets/dummy/dummy-data-6.png";

const dummyImages = [dummy1, dummy2, dummy3, dummy4, dummy5, dummy6];

function Company(props) {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    url: "",
    isCompany: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrapedData, setScrapedData] = useState([]);
  const [selectedWebpage, setSelectedWebpage] = useState(null);
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const resultsRef = useRef(null);

  // Simulation of scraping process
  useEffect(() => {
    if (isSubmitted) {
      const initialData = dummyImages.map((img, index) => ({
        id: index,
        image: img,
        status: "pending",
        chunks: [
          `Chunk 1 from page ${index + 1}`,
          `Chunk 2 from page ${index + 1}`,
        ],
      }));

      setScrapedData(initialData);

      const timers = initialData.map((_, index) =>
        setTimeout(() => {
          setScrapedData((prev) =>
            prev.map((item) =>
              item.id === index ? { ...item, status: "scraping" } : item
            )
          );

          setTimeout(() => {
            setScrapedData((prev) =>
              prev.map((item) =>
                item.id === index ? { ...item, status: "scraped" } : item
              )
            );
          }, 2000);
        }, index * 1500)
      );

      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, [isSubmitted]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleSubmit = contextSafe((e) => {
    e.preventDefault();

    // Animate form exit
    gsap.to(formRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setIsSubmitted(true);
      },
    });
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendData = (data) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // eslint-disable-next-line react/prop-types
        props.onSubmit(data);
      },
    });
  };

  useGSAP(
    () => {
      if (isSubmitted) {
        // Animate results container entrance
        gsap.from(resultsRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        // Animate individual scraped items
        gsap.from(".scraped-item", {
          opacity: 0,
          y: -30,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out",
          delay: 0.3,
        });
      }
    },
    { dependencies: [isSubmitted], scope: containerRef }
  );

  return (
    <div className="flex flex-col" ref={containerRef}>
      {!isSubmitted ? (
        <form
          ref={formRef}
          className="h-[70vh] md:h-[80vh] flex flex-col items-center gap-y-5 justify-center w-full"
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
      ) : (
        <div ref={resultsRef} className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 px-10 mb-8">
            {scrapedData.map((item) => (
              <div
                key={item.id}
                className="scraped-item relative cursor-pointer"
                onClick={() => setSelectedWebpage(item)}
              >
                <img
                  src={item.image}
                  alt={`Scraped content ${item.id + 1}`}
                  className="rounded-t-lg rounded-b-2xl border-2 transition-all duration-300"
                  style={{
                    borderColor:
                      item.status === "scraped"
                        ? "#4ade80"
                        : item.status === "scraping"
                        ? "#facc15"
                        : "#ef4444",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gray-600 duration-200 rounded-b-lg bg-opacity-50 text-white p-2 text-sm"
                  style={{
                    backgroundColor:
                      item.status === "scraped"
                        ? "#4ade80"
                        : item.status === "scraping"
                        ? "#facc15"
                        : "#ef4444",
                  }}
                >
                  Status: {item.status}
                </div>
              </div>
            ))}
          </div>

          {selectedWebpage && (
            <div className="mb-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-white text-xl mb-4">
                Data Chunks - {selectedWebpage.status.toUpperCase()}
              </h3>
              <div className="grid gap-2">
                {selectedWebpage.chunks.map((chunk, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-700 rounded text-gray-200 text-sm"
                  >
                    {chunk}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-2">
            <button
              className="bg-blue-500 hover:bg-blue-400 px-6 py-2 rounded-lg text-white transition-colors"
              onClick={() => {
                sendData(companyData);
              }}
            >
              Proceed to Next Step
            </button>
            <div className="flex items-center text-gray-400">
              <span className="animate-pulse">Training in progress...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Company;
