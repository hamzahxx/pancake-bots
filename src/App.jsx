import background from "./assets/background.svg";
import Authentication from "./components/Authentication";

function App() {
  return (
    <div className="bg-[#0B1120] flex h-screen items-center justify-center">
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
