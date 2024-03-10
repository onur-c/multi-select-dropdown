import MultiSelectDropdownDemo from "./components/MultiSelectDropdownDemo";
import { MultiSelectContextProvider } from "./providers/MultiSelectProvider";

function App() {
  return (
    <main className="flex items-center justify-center w-screen min-h-screen bg-blue-100 text-slate-800">
      <MultiSelectContextProvider>
        <MultiSelectDropdownDemo />
      </MultiSelectContextProvider>
    </main>
  );
}

export default App;
