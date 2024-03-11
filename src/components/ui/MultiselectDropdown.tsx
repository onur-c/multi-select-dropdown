import { ComponentPropsWithoutRef, forwardRef } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiCloseCircleFill } from "react-icons/ri";
import useMultiSelectContext from "../../hooks/useMultiSelectContext";
import { cn } from "../../lib/utils";
import SuccessDropdown from "../SuccessDropdown";
import ErrorSkeleton from "./ErrorSkeleton";
import LoadingSkeleton from "./LoadingSkeleton";

const MultiSelectDropdownContainer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  const { isError } = useMultiSelectContext();
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "relative p-2 flex flex-wrap items-center bg-white border border-black/40 rounded-xl has-[input:focus]:ring-2 max-w-xl",
        className,
        isError && "ring-red-600 ring-2 ring-opacity-50"
      )}
    >
      {children}
    </div>
  );
});

const MultiSelectDropdownSelectedTagArea = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { selectedCharacters, deleteSelected } = useMultiSelectContext();
  return (
    <div
      {...props}
      ref={ref}
      className={cn("flex flex-wrap items-center gap-1", className)}
    >
      {selectedCharacters?.length > 0 &&
        selectedCharacters.map((selectedChar) => (
          <MultiSelectDropdownSelectedTag
            key={selectedChar.id}
            onClick={() => deleteSelected(selectedChar.id)}
          >
            <p className="text-sm">{selectedChar.name}</p>
            <RiCloseCircleFill className="text-slate-500 size-5" />
          </MultiSelectDropdownSelectedTag>
        ))}
    </div>
  );
});

const MultiSelectDropdownSelectedTag = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(({ children, className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        "flex items-center flex-shrink-0 gap-1 px-2 py-1 transition-opacity rounded-lg cursor-pointer bg-slate-300 hover:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
});

const MultiSelectDropdownSearchArea = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  const { input, setInput, isLoading, isError } = useMultiSelectContext();
  return (
    <div
      {...props}
      ref={ref}
      className={cn("flex items-center justify-between flex-1 p-1", className)}
    >
      <>
        {children}
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
        <div className="mr-6 size-4">
          {isLoading && (
            <ImSpinner8 className=" animate-spin size-4 opacity-70" />
          )}
          {isError && (
            <FaCircleExclamation className="text-red-600 animate-bounce size-4 opacity-70" />
          )}
        </div>
      </>
    </div>
  );
});

const MultiSelectDropdownTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  const { toggleDropDown, dropdownOpen, closeDropDown } =
    useMultiSelectContext();
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-2 absolute right-2  size-5",
        className
      )}
    >
      <button
        onClick={toggleDropDown}
        onKeyUp={(e) => e.key === "Escape" && closeDropDown()}
      >
        {children || (
          <IoMdArrowDropdown
            className={`transition-transform 
          ${dropdownOpen ? "rotate-180 " : ""}`}
          />
        )}
      </button>
    </div>
  );
});

const MultiSelectDropdownModal = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  const { dropdownOpen, closeDropDown, isError, isLoading, isSuccess, error } =
    useMultiSelectContext();

  return (
    <div
      {...props}
      ref={ref}
      onKeyUp={(e) => e.key === "Escape" && closeDropDown()}
      className={cn(
        `top-[calc(100%+1rem)] left-0 scrollable-div absolute max-h-[300px] min-h-[300px] overflow-y-scroll w-full bg-white rounded-lg border border-black/40  transition-opacity ${
          dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`,
        className
      )}
    >
      <>
        {children}
        {isError ? (
          <ErrorSkeleton error={error} />
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : (
          isSuccess && <SuccessDropdown />
        )}
      </>
    </div>
  );
});

export {
  MultiSelectDropdownContainer,
  MultiSelectDropdownModal,
  MultiSelectDropdownSearchArea,
  MultiSelectDropdownSelectedTag,
  MultiSelectDropdownSelectedTagArea,
  MultiSelectDropdownTrigger,
};
