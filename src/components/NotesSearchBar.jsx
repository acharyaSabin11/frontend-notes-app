import { Search } from "lucide-react";
import { useState } from "react";
import useSearchResults from "../hooks/useSearchResults";
import Spinner from "./spinner";
import useDebounce from "../hooks/useDebounce";

export default function NotesSearchBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);
  const { isLoading, isError, searchResults } = useSearchResults({
    searchText: debouncedText,
  });

  const highlightText = (content, searchText) => {
    const parts = content.split(new RegExp(`(${searchText})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span key={index} className="text-primary">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-start w-full gap-2">
      <div className="relative h-10 w-60 ">
        <Search className="absolute translate-y-1/2 bottom-1/2 pl-4 size-8 text-gray-700" />
        <input
          type="text"
          placeholder="Search notes"
          className="border-2 border-black rounded-full px-4 py-1 hover:border-primary focus:border-primary focus:outline-none w-full absolute h-full pl-10"
          onFocus={() => setIsSearching(true)}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            if (text === "") {
              setIsSearching(false);
            }
          }}
        />
      </div>
      <p
        className={`self-center text-sm text-gray-500 font-semibold ${
          text.length < 3 && isSearching ? "visible" : "invisible"
        }`}
      >
        Enter atleast 3 characters to search
      </p>
      <div
        className={`w-full ${
          isSearching ? "visible" : "invisible"
        } flex flex-col gap-2`}
      >
        {isLoading && <Spinner />}
        {isError && <p>Something went wrong</p>}
        {text.length >= 3 &&
          (!searchResults ||
            (searchResults.length === 0 && <div>No results found</div>))}
        {searchResults && searchResults.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold">Search Results</h2>
            <div className="flex flex-col gap-4">
              {searchResults.map((note) => (
                <div
                  key={note.id}
                  className="border-2 border-black px-4 py-2 min-h-20 rounded-lg"
                >
                  <h3 className="text-lg font-semibold">
                    {highlightText(note.title, text)}
                  </h3>
                  <p className="text-sm">
                    {highlightText(note.description, text)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
