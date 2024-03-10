import { ComponentPropsWithoutRef, forwardRef } from "react";
import useMultiSelectContext from "../../hooks/useMultiSelectContext";
import { cn } from "../../lib/utils";

const MultiSelectDropdownContainer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "relative p-2 flex flex-wrap items-center  bg-white border border-black/40 rounded-xl has-[input:focus]:ring-2 max-w-xl",
        className
      )}
    >
      {children}
    </div>
  );
});

const MultiSelectDropdownSelectedTagArea = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn("flex flex-wrap items-center gap-1", className)}
    >
      {children}
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
  return (
    <div
      {...props}
      ref={ref}
      className={cn("flex items-center justify-between flex-1 p-1", className)}
    >
      {children}
    </div>
  );
});

const MultiSelectDropdownTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  const { toggleDropDown } = useMultiSelectContext();
  return (
    <div
      {...props}
      ref={ref}
      className={cn("flex items-center gap-2 absolute right-2", className)}
    >
      <button onClick={toggleDropDown}>{children}</button>
    </div>
  );
});

const MultiSelectDropdownModal = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  const { dropdownOpen, closeDropDown } = useMultiSelectContext();
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
      {children}
    </div>
  );
});

export {
  MultiSelectDropdownContainer,
  MultiSelectDropdownModal,
  MultiSelectDropdownTrigger,
  MultiSelectDropdownSearchArea,
  MultiSelectDropdownSelectedTagArea,
  MultiSelectDropdownSelectedTag,
};
