import { InfiniteData } from "@tanstack/react-query";
import { ApiResponseType } from "../../types";
import DropdownCard from "./DropdownCard";
import useMultiSelectContext from "../../hooks/useMultiSelectContext";

const SuccessDropdown = ({
  data,
}: {
  data: InfiniteData<ApiResponseType, unknown>;
}) => {
  const { input, ref } = useMultiSelectContext();

  return data.pages.map((page) =>
    page.results
      .filter((result) => {
        return result.name.toLowerCase().includes(input.toLowerCase());
      })
      .map((result, index) => {
        if (page.results.length === index + 1)
          return (
            <DropdownCard
              result={result}
              key={result.id + Date.now()}
              innerRef={ref}
            />
          );
        return <DropdownCard result={result} key={result.id + Date.now()} />;
      })
  );
};

export default SuccessDropdown;
