import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import Spinner from "./spinner";

export default function CategoriesSelector({
  categories,
  register,
  setValue,
  formState,
  allowSubmit,
  setAllowSubmit,
  watch,
  isGettingCategories,
  defaultSelectedCategories,
  reset,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    console.log(defaultSelectedCategories);
    if (defaultSelectedCategories) {
      setSelectedCategories(defaultSelectedCategories);
    }
  }, [defaultSelectedCategories]);

  useEffect(() => {
    setValue(
      "categories",
      selectedCategories.map((c) => c.id)
    );
  }, [selectedCategories, setValue]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Categories</h2>
      {isGettingCategories ? (
        <Spinner />
      ) : categories.length !== 0 ? (
        <div className="flex flex-col gap-2 items-start">
          <ul className="flex flex-wrap gap-2 ">
            {categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            ))}
          </ul>
          <AddCategory
            register={register("newCategory")}
            formState={formState}
            allowSubmit={allowSubmit}
            setAllowSubmit={setAllowSubmit}
            watch={watch}
            setValue={setValue}
            reset={reset}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      ) : (
        <AddCategory
          register={register("newCategory")}
          formState={formState}
          allowSubmit={allowSubmit}
          setAllowSubmit={setAllowSubmit}
          watch={watch}
          setValue={setValue}
          reset={reset}
          setSelectedCategories={setSelectedCategories}
        />
      )}
      <input type="hidden" {...register("categories")} />
    </div>
  );
}

function Category({ category, selectedCategories, setSelectedCategories }) {
  return (
    <button
      className={`px-4 py-1 text-sm font-semibold  border-2 ${
        selectedCategories.map((c) => c.id).includes(category.id)
          ? "bg-primary border-primary text-white"
          : "bg-transparent border-black text-black focus:border-primary  focus:text-primary"
      } bg-primary rounded-full cursor-pointer focus:outline-none `}
      type="button"
      onClick={() => {
        if (selectedCategories.map((c) => c.id).includes(category.id)) {
          setSelectedCategories((cat) =>
            cat.filter((c) => c.id !== category.id)
          );
        } else {
          setSelectedCategories([...selectedCategories, category]);
        }
      }}
    >
      {category.title}
    </button>
  );
}
