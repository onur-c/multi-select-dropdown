import { createContext, useCallback, useMemo, useState } from "react";
import { CharacterType } from "../types";
import { useInView } from "react-intersection-observer";

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

  const value = useMemo(
    () => ({
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
    ]
  );

  return (
    <MultiSelectContext.Provider value={value}>
      {children}
    </MultiSelectContext.Provider>
  );
};
