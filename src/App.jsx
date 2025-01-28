import background from "./assets/background.svg";

function App() {
  return (
    <div className="bg-[#0B1120] flex h-screen items-center justify-center">
      <div className="text-5xl relative z-10 text-white font-extrabold">
        Content
      </div>
      <img className="min-w-screen absolute bottom-0 z-[1]" src={background} />
    </div>
  );
}

export default App;
