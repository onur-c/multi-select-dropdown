import { useEffect } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiCloseCircleFill } from "react-icons/ri";
import useInfiniteFetchCharacter from "../hooks/useInfiniteFetchCharacter";
import useMultiSelectContext from "../hooks/useMultiSelectContext";
import LoadingSkeleton from "./ui/LoadingSkeleton";
import {
  MultiSelectDropdownContainer,
  MultiSelectDropdownModal,
  MultiSelectDropdownSearchArea,
  MultiSelectDropdownSelectedTag,
  MultiSelectDropdownSelectedTagArea,
  MultiSelectDropdownTrigger,
} from "./ui/MultiselectDropdown";
import ErrorSkeleton from "./ui/ErrorSkeleton";
import SuccessDropdown from "./SuccessDropdown";

const MultiSelectDropdownDemo = () => {
  const {
    input,
    inView,
    selectedCharacters,
    deleteSelected,
    setInput,
    dropdownOpen,
  } = useMultiSelectContext();

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
              onClick={() => deleteSelected(selectedChar.id)}
            >
              <p className="text-sm">{selectedChar.name}</p>
              <RiCloseCircleFill className="text-slate-500 size-5" />
            </MultiSelectDropdownSelectedTag>
          ))}
      </MultiSelectDropdownSelectedTagArea>

      <MultiSelectDropdownSearchArea>
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
      </MultiSelectDropdownSearchArea>
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
