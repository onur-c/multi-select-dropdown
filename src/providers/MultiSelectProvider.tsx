import { createContext, useCallback, useMemo, useState } from "react";
import { ApiResponseType, CharacterType } from "../types";
import { useInView } from "react-intersection-observer";
import useInfiniteFetchCharacter from "../hooks/useInfiniteFetchCharacter";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

type TMultiSelectContext = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  selectedCharacters: CharacterType[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>;
  deleteSelected: (id: number) => void;

  handleCheckbox: (id: number, character: CharacterType) => void;
  isChecked: (id: number) => boolean;

  dropdownOpen: boolean;
  toggleDropDown: () => void;
  closeDropDown: () => void;

  ref: (node?: Element | null | undefined) => void;
  inView: boolean;

  data: InfiniteData<ApiResponseType, unknown> | undefined;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<ApiResponseType, unknown>, Error>
  >;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
};

export const MultiSelectContext = createContext<TMultiSelectContext | null>(
  null
);

export const MultiSelectContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [input, setInput] = useState<string>("");
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterType[]>(
    []
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { ref, inView } = useInView();

  const toggleDropDown = () => setDropdownOpen((prev) => !prev);

  const closeDropDown = () => setDropdownOpen(false);

  const isChecked = useCallback(
    (id: number) =>
      selectedCharacters.map((selected) => selected.id).includes(id),
    [selectedCharacters]
  );

  const handleCheckbox = useCallback(
    (id: number, character: CharacterType) => {
      selectedCharacters.map((selected) => selected.id).includes(id)
        ? setSelectedCharacters([
            ...selectedCharacters.filter((selected) => selected.id !== id),
          ])
        : setSelectedCharacters((prev) => [...prev, character]);
    },
    [selectedCharacters]
  );

  const deleteSelected = useCallback(
    (id: number) => {
      const filteredArr = selectedCharacters.filter(
        (selected) => selected.id !== id
      );
      setSelectedCharacters([...filteredArr]);
    },
    [selectedCharacters]
  );

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useInfiniteFetchCharacter({ characterName: input });

  const value = useMemo(
    () => ({
      data,
      hasNextPage,
      fetchNextPage,
      isLoading,
      isError,
      isSuccess,
      error,
      input,
      setInput,
      selectedCharacters,
      setSelectedCharacters,
      handleCheckbox,
      isChecked,
      toggleDropDown,
      closeDropDown,
      dropdownOpen,
      ref,
      inView,
      deleteSelected,
    }),
    [
      input,
      selectedCharacters,
      handleCheckbox,
      isChecked,
      dropdownOpen,
      ref,
      inView,
      deleteSelected,
      data,
      hasNextPage,
      fetchNextPage,
      error,
      isLoading,
      isError,
      isSuccess,
    ]
  );

  return (
    <MultiSelectContext.Provider value={value}>
      {children}
    </MultiSelectContext.Provider>
  );
};
