const SubstringHighlighter = ({
  text,
  substring,
}: {
  text: string;
  substring: string;
}) => {
  const parts = text.split(new RegExp(`(${substring})`, "gi"));

  return (
    <div>
      {parts.map((part, index) =>
        part.toLowerCase() === substring.toLowerCase() ? (
          // Highlight the substring
          <span key={index} className="font-bold">
            {part}
          </span>
        ) : (
          // Normal text
          <span key={index}>{part}</span>
        )
      )}
    </div>
  );
};

export default SubstringHighlighter;
