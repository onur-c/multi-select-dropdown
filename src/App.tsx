import MultiSelectDropdown from "./components/MultiSelectDropdown/MultiSelectDropdown";
import { MultiSelectContextProvider } from "./providers/MultiSelectProvider";

function App() {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-blue-100 text-slate-800">
      <MultiSelectContextProvider>
        <MultiSelectDropdown />
      </MultiSelectContextProvider>
    </div>
  );
}

export default App;
