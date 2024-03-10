import { useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiCloseCircleFill } from "react-icons/ri";
import useInfiniteFetchCharacter from "../hooks/useInfiniteFetchCharacter";
import useMultiSelectContext from "../hooks/useMultiSelectContext";
import SuccessDropdown from "./SuccessDropdown";
import ErrorSkeleton from "./ui/ErrorSkeleton";
import LoadingSkeleton from "./ui/LoadingSkeleton";
import {
  MultiSelectDropdownContainer,
  MultiSelectDropdownModal,
  MultiSelectDropdownSearchArea,
  MultiSelectDropdownSelectedTag,
  MultiSelectDropdownSelectedTagArea,
  MultiSelectDropdownTrigger,
} from "./ui/MultiselectDropdown";

const MultiSelectDropdownDemo = () => {
  const { input, inView, selectedCharacters, deleteSelected, dropdownOpen } =
    useMultiSelectContext();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useInfiniteFetchCharacter({ characterName: input });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <MultiSelectDropdownContainer
      className={`${isError && "ring-red-600 ring-2 ring-opacity-50"}`}
    >
      <MultiSelectDropdownSelectedTagArea>
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
      </MultiSelectDropdownSelectedTagArea>

      <MultiSelectDropdownSearchArea isError={isError} isLoading={isLoading} />

      <MultiSelectDropdownTrigger>
        <IoMdArrowDropdown
          className={`transition-transform size-6  
          ${dropdownOpen ? "rotate-180 " : ""}`}
        />
      </MultiSelectDropdownTrigger>

      <MultiSelectDropdownModal>
        {isError ? (
          <ErrorSkeleton error={error} />
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : (
          isSuccess && <SuccessDropdown data={data!} />
        )}
      </MultiSelectDropdownModal>
    </MultiSelectDropdownContainer>
  );
};

export default MultiSelectDropdownDemo;
