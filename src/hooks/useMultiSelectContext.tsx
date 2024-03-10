import { useContext } from "react";
import { MultiSelectContext } from "../providers/MultiSelectProvider";

const useMultiSelectContext = () => {
  const context = useContext(MultiSelectContext);

  if (!context) {
    throw new Error(
      "MultiSelectContext must be used within a MultiSelectContextProvider"
    );
  }

  return context;
};

export default useMultiSelectContext;
