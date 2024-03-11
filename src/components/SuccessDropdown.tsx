import useMultiSelectContext from "../hooks/useMultiSelectContext";
import DropdownCard from "./DropdownCard";

const SuccessDropdown = () => {
  const { input, ref, data } = useMultiSelectContext();

  return data!.pages.map((page) =>
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
