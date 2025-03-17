import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    console.log("SortBy");
    if (!searchParams.get("sort") && !searchParams.get("orderBy")) {
      console.log("No Both");
      searchParams.set("sort", "Date");
      searchParams.set("orderBy", "DESC");
      setSearchParams(searchParams);
    } else if (!searchParams.get("sort")) {
      console.log("No Sort");
      searchParams.set("sort", "Date");
      setSearchParams(searchParams);
    } else if (!searchParams.get("orderBy")) {
      searchParams.set("orderBy", "DESC");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  function setSortBy(value) {
    const [sortBy, orderBy] = value.split(" ");
    searchParams.set("sort", sortBy);
    searchParams.set("orderBy", orderBy);
    setSearchParams(searchParams);
  }

  const sortBy = searchParams.get("sort") || "Date";
  const orderBy = searchParams.get("orderBy") || "DESC";
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-by" className="text-lg">
        Sort by:
      </label>
      <select
        id="sort-by"
        value={sortBy + " " + orderBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border-2 border-primary rounded-md p-1"
      >
        <option value="Date DESC">Newest</option>
        <option value="Date ASC">Oldest</option>
        <option value="Title ASC">Title A-Z</option>
        <option value="Title DESC">Title Z-A</option>
      </select>
    </div>
  );
}
