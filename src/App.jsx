import background from "./assets/background.svg";
import Authentication from "./components/Authentication";

function App() {
  return (
    <div className="bg-[#0B1120] flex flex-col h-screen items-center justify-center">
      <h1 className="text-white absolute z-10 top-10 text-4xl font-bold">BeyondChats</h1>
      <div className="relative z-10">
        <Authentication />
      </div>
      <img
        className="min-w-screen absolute bottom-0 lg:top-[-10px] z-[1]"
        src={background}
      />
    </div>
  );
}

export default App;
