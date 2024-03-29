import { useEffect, useState } from "react";

const useDebounce = ({ value, delay }: { value: string; delay: number }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutID);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
