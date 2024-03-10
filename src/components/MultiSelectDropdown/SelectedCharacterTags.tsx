import { RiCloseCircleFill } from "react-icons/ri";
import useMultiSelectContext from "../../hooks/useMultiSelectContext";

const SelectedCharacterTags = () => {
  const { selectedCharacters, deleteSelected } = useMultiSelectContext();

  return (
    <span className="flex flex-wrap items-center gap-1">
      {selectedCharacters?.length > 0 &&
        selectedCharacters.map((selectedChar) => (
          <button
            key={selectedChar.name}
            className="flex items-center flex-shrink-0 gap-1 px-2 py-1 transition-opacity rounded-lg cursor-pointer bg-slate-300 hover:opacity-50"
            onClick={() => deleteSelected(selectedChar.id)}
          >
            <p className="text-sm">{selectedChar.name}</p>
            <RiCloseCircleFill className="text-slate-500 size-5" />
          </button>
        ))}
    </span>
  );
};

export default SelectedCharacterTags;
