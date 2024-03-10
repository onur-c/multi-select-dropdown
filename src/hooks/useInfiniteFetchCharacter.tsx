import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponseType } from "../types";
import useDebounce from "./useDebounce";

type TInfiniteFetch = {
  characterName: string;
};

const useInfiniteFetchCharacter = ({ characterName }: TInfiniteFetch) => {
  const debouncedInput = useDebounce({ value: characterName, delay: 1000 });

  // Get request for given character name.
  const fetchCharacters = async ({ pageParam }: { pageParam: number }) => {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${pageParam}&name=${debouncedInput}`
    );

    return data as ApiResponseType;
  };

  // Returns hasNextPage - fetchNextPage etc. for infinite scrolling
  return useInfiniteQuery({
    queryKey: ["characters", debouncedInput.toLowerCase()],
    queryFn: fetchCharacters,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage.info.pages;
      const nextPage = allPages.length + 1;

      return nextPage <= maxPages ? nextPage : undefined;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useInfiniteFetchCharacter;
