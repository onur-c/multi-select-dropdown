import { MultiSelectContextProvider } from "../providers/MultiSelectProvider";
import {
  MultiSelectDropdownContainer,
  MultiSelectDropdownModal,
  MultiSelectDropdownSearchArea,
  MultiSelectDropdownSelectedTagArea,
  MultiSelectDropdownTrigger,
} from "./ui/MultiselectDropdown";

const MultiSelectDropdownDemo = () => {
  // const {
  //   data,
  //   hasNextPage,
  //   fetchNextPage,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   error,
  // } = useInfiniteFetchCharacter({ characterName: input });

  return (
    <MultiSelectContextProvider>
      <MultiSelectDropdownContainer>
        <MultiSelectDropdownSelectedTagArea />
        <MultiSelectDropdownSearchArea />
        <MultiSelectDropdownTrigger>
          {/* You can customize trigger */}
        </MultiSelectDropdownTrigger>
        <MultiSelectDropdownModal>
          {/* You can put children here */}
        </MultiSelectDropdownModal>
      </MultiSelectDropdownContainer>
    </MultiSelectContextProvider>
  );
};

export default MultiSelectDropdownDemo;
