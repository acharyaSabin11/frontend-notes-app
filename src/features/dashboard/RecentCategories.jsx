import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";
import useRecentCategories from "./useRecentCategories";

export default function RecentCategories() {
  const { categories, isFetchingRecentCategories, isError } =
    useRecentCategories();
  return (
    <div className="h-full w-full  flex flex-col items-start  gap-6">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-semibold">Recent Categories</h1>
        <Link
          to="/categories"
          className="text-primary font-bold cursor-pointer hover:rounded-full hover:bg-primary hover:text-white px-4 py-1  transition-all duration-300"
        >
          View all
        </Link>
      </div>
      {isFetchingRecentCategories ? (
        <Spinner />
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.length === 0 && <div>No notes found</div>}
          {categories.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow-md w-full"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-500">{note.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
