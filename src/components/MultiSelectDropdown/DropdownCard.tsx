import useMultiSelectContext from "../../hooks/useMultiSelectContext";
import { CharacterType } from "../../types";
import SubstringHighlighter from "../SubstringHighlighter";

type TDropdownCard = {
  result: CharacterType;
  innerRef?: (node?: Element | null | undefined) => void;
};

const DropdownCard = ({ result, innerRef }: TDropdownCard) => {
  const { handleCheckbox, isChecked, input } = useMultiSelectContext();

  if (innerRef) {
    return (
      <label
        key={result.id + Date.now()}
        ref={innerRef}
        className="flex items-center p-2 border-b gap-2  border-slate-400 cursor-pointer hover:bg-slate-100 transition-colors has-[input:focus]:bg-slate-100"
      >
        <input
          type="checkbox"
          className="accent-blue-600 size-4"
          checked={isChecked(result.id)}
          onChange={() => handleCheckbox(result.id, { ...result })}
        />
        <img
          src={result.image}
          alt={`Picture of ${result.name}`}
          className="w-10 h-10 rounded-xl"
        />
        <div>
          <SubstringHighlighter text={result.name} substring={input} />
          <p className="text-slate-500">{result.episode.length} Episodes</p>
        </div>
      </label>
    );
  } else {
    return (
      <label
        key={result.id + Date.now()}
        className="flex items-center p-2 border-b gap-2  border-slate-400 cursor-pointer hover:bg-slate-100 transition-colors has-[input:focus]:bg-slate-100"
      >
        <input
          type="checkbox"
          className=" accent-blue-600 size-4"
          checked={isChecked(result.id)}
          onChange={() => handleCheckbox(result.id, { ...result })}
        />
        <img src={result.image} alt="" className="w-10 h-10 rounded-xl" />
        <div>
          <SubstringHighlighter text={result.name} substring={input} />
          <p className="text-slate-500">{result.episode.length} Episodes</p>
        </div>
      </label>
    );
  }
};

export default DropdownCard;
