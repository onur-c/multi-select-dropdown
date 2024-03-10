import { InfiniteData } from "@tanstack/react-query";
import { IoMdArrowDropdown } from "react-icons/io";
import useMultiSelectContext from "../../hooks/useMultiSelectContext";
import { ApiResponseType } from "../../types";
import DropdownSkeleton from "../DropdownSkeleton";
import ErrorDropdown from "./ErrorDropdown";
import SuccessDropdown from "./SuccessDropdown";

type TDropdownModal = {
  data: InfiniteData<ApiResponseType, unknown> | undefined;
  status: "error" | "success" | "pending";
  error: Error | null;
};

const DropdownModal = ({ data, status, error }: TDropdownModal) => {
  const { dropdownOpen, toggleDropDown, closeDropDown } =
    useMultiSelectContext();

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-[1px] h-8 bg-slate-300" />
        <button onClick={toggleDropDown}>
          <IoMdArrowDropdown
            className={`transition-transform size-6  
          ${dropdownOpen ? "rotate-180 " : ""}`}
          />
        </button>
      </div>

      <div
        onKeyUp={(e) => e.key === "Escape" && closeDropDown()}
        className={`top-[calc(100%+1rem)] left-0  scrollable-div absolute max-h-[300px] overflow-y-scroll w-full bg-white rounded-lg border border-black/40  transition-opacity  ${
          dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {status === "error" ? (
          <ErrorDropdown error={error} />
        ) : status === "pending" && typeof data === "undefined" ? (
          <DropdownSkeleton />
        ) : (
          status === "success" && <SuccessDropdown data={data!} />
        )}
      </div>
    </>
  );
};

export default DropdownModal;
