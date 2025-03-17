import { Link } from "react-router-dom";
import Spinner from "../components/spinner";
import useCategoriesData from "../features/categories/useCategoriesData";

export default function AllCategoriesPage() {
  const { isGettingCategories, isError, categories } = useCategoriesData();
  if (isGettingCategories) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div>
          <Spinner />
          <span>Loading Your Notes</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[70rem] min-h-screen flex flex-col gap-10 p-4 mx-auto justify-start  ">
      <h1 className="text-4xl text-semibold self-center">All Categories</h1>
      <Categories categories={categories} isError={isError} />
    </div>
  );
}

function Categories({ categories, isError }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Categories</h2>
      {isError ? (
        <div>Something went wrong</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.length === 0 && <div>No categories found</div>}
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

function Category({ category }) {
  return (
    <Link
      to={`/categories/${category.id}`}
      className="bg-white p-4 rounded-lg shadow-md w-full hover:shadow-lg cursor-pointer hover:shadow-primary transition-all duration-300"
    >
      <h2 className="text-xl font-semibold">{category.title}</h2>
    </Link>
  );
}
