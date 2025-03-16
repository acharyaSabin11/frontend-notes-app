import { Filter } from "lucide-react";
import useCategoriesData from "../features/categories/useCategoriesData";
import Spinner from "./spinner";
import { useSearchParams } from "react-router-dom";

export default function FilterCategories() {
  const { isGettingCategories, isError, categories } = useCategoriesData();

  if (isError) {
    return <div>Something went wrong while loading categories</div>;
  }

  return (
    <div>
      {isGettingCategories ? (
        <Spinner />
      ) : categories.length !== 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold ">
            <div className="flex items-center gap-2">
              <Filter /> Filters
            </div>
          </h2>
          <ul className="flex flex-wrap gap-2">
            <Category key="all" category={{ id: "all", title: "All" }} />
            {categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Category({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilter = () => {
    setSearchParams({ ...searchParams, filter: category.id });
  };
  return (
    <li>
      <button
        className={`text-sm font-semibold px-4 py-1 cursor-pointer border-2 rounded-full border-primary text-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white ${
          searchParams.get("filter") == category.id
            ? "bg-primary text-white"
            : ""
        }`}
        onClick={handleFilter}
      >
        {category.title}
      </button>
    </li>
  );
}
