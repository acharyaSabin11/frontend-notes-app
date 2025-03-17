import { useEffect, useRef } from "react";
import useCreateCategory from "../features/categories/useCreateCategory";

export default function AddCategory({
  register,
  allowSubmit,
  setAllowSubmit,
  watch,
  reset,
  setSelectedCategories,
}) {
  const newCategory = watch("newCategory");
  const { isCreatingCategory, createCategory } = useCreateCategory();
  const ref = useRef();

  useEffect(() => {
    if (!allowSubmit) {
      ref?.current?.focus();
    }
  });
  const handleCategoryAdd = () => {
    createCategory(
      {
        category: newCategory,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          reset({ newCategory: "" });
          setSelectedCategories((state) => [...state, data]);
          setAllowSubmit(true);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full ">
      <button
        className={`px-4 py-1 text-sm font-semibold  border-2  ${
          allowSubmit ? "bg-black text-black" : "border-primary text-primary"
        } bg-transparent hover:bg-primary  hover:text-white rounded-full cursor-pointer focus:border-primary focus:outline-none focus:text-primary`}
        type="button"
        onClick={() => setAllowSubmit((state) => !state)}
      >
        {allowSubmit ? "+ Add Category" : "- Close Category Form"}
      </button>

      <div
        className="flex flex-col gap-1 items-end w-full"
        hidden={allowSubmit}
      >
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold capitalize" htmlFor="Add Category">
            Add Category
          </label>
          <div className="flex justify-between items-center w-full gap-4">
            <input
              {...register}
              ref={(el) => {
                if (ref) {
                  if (typeof ref === "function") {
                    ref(el);
                  } else {
                    ref.current = el;
                  }
                }
                register?.ref?.(el);
              }}
              className={`border-2  p-2 rounded-md w-full focus:border-background border-grey-200 focus:outline-none`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCategoryAdd();
                }
              }}
            />
            <button
              className="px-4 py-1 text-sm font-semibold  border-2 border-black text-black focus:border-primary hover:border-primary focus:text-primary bg-transparent hover:text-primary rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-0 disabled:text-white focus:outline-none"
              type="button"
              disabled={isCreatingCategory || !newCategory}
              onClick={handleCategoryAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
