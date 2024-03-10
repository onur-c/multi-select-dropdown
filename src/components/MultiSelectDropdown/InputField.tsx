import { ImSpinner8 } from "react-icons/im";
import useMultiSelectContext from "../../hooks/useMultiSelectContext";
import { FaCircleExclamation } from "react-icons/fa6";

const InputField = ({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) => {
  const { input, setInput } = useMultiSelectContext();
  return (
    <div className="flex items-center justify-between flex-1 p-1">
      <input
        autoFocus
        type="text"
        className="outline-none"
        placeholder={isLoading ? "Loading..." : "Search..."}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <div className="mr-2 size-4">
        {isLoading && (
          <ImSpinner8 className=" animate-spin size-4 opacity-70" />
        )}
        {isError && (
          <FaCircleExclamation className="text-red-600 animate-bounce size-4 opacity-70" />
        )}
      </div>
    </div>
  );
};

export default InputField;
