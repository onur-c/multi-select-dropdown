import { useEffect } from "react";
import useInfiniteFetchCharacter from "../../hooks/useInfiniteFetchCharacter";
import useMultiSelectContext from "../../hooks/useMultiSelectContext";
import DropdownModal from "./DropdownModal";
import InputField from "./InputField";
import SelectedCharacterTags from "./SelectedCharacterTags";
import Container from "./Container";

const MultiSelectDropdown = () => {
  const { input, inView } = useMultiSelectContext();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    status,
    error,
  } = useInfiniteFetchCharacter({ characterName: input });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Container isError={isError}>
      <SelectedCharacterTags />
      <InputField isLoading={isLoading} isError={isError} />
      <DropdownModal data={data} error={error} status={status} />
    </Container>
  );
};

export default MultiSelectDropdown;
