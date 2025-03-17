import { Search } from "lucide-react";
import { useState } from "react";
import useSearchResults from "../hooks/useSearchResults";
import Spinner from "./spinner";

export default function NotesSearchBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState("");
  const { isLoading, isError, searchResults } = useSearchResults({
    searchText: text,
  });

  return (
    <div className="flex flex-col items-center justify-start w-full">
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
      <div className={`w-full ${isSearching ? "block" : "hidden"}`}>
        <h2 className="text-2xl font-semibold">Search Results</h2>
        {isLoading && <Spinner />}
        {isError && <div>Something went wrong</div>}
        {!searchResults ||
          (searchResults.length === 0 && <div>No results found</div>)}
        {searchResults && searchResults.length > 0 && (
          <div className="flex flex-col gap-4">
            {searchResults.map((note) => (
              <div
                key={note.id}
                className="border-2 border-black px-4 py-2 min-h-20 rounded-lg"
              >
                <h3 className="text-lg font-semibold">
                  {note.title.split(text).map((str, index, array) => {
                    if (index === array.length - 1) {
                      return <span>{str}</span>;
                    } else {
                      return (
                        <span>
                          {str}
                          <span className="text-primary">{text}</span>
                        </span>
                      );
                    }
                  })}
                </h3>
                <p className="text-sm">
                  {note.description.split(text).map((str, index, array) => {
                    if (index === array.length - 1) {
                      return <span>{str}</span>;
                    } else {
                      return (
                        <span>
                          {str}
                          <span className="text-primary">{text}</span>
                        </span>
                      );
                    }
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
