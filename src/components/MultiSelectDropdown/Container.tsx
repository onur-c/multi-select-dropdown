import { ReactNode } from "react";

const Container = ({
  children,
  isError,
}: {
  children: ReactNode;
  isError: boolean;
}) => {
  return (
    <div
      className={`relative p-2 flex flex-wrap items-center justify-between bg-white border border-black/40 rounded-xl has-[input:focus]:ring-2 max-w-xl  ${
        isError ? "ring-red-600 ring-2 ring-opacity-50" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
