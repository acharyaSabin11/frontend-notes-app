import { useForm } from "react-hook-form";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import useCreateCategory from "./useCreateCategory";
import useUpdateCategory from "./useUpdateCategory";

export default function CategoryForm({
  close,
  type = "create",
  defVal,
  categoryId,
}) {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: defVal,
  });
  const { errors } = formState;
  const { isCreatingCategory, createCategory } = useCreateCategory();
  const { isUpdating, updateCategory } = useUpdateCategory();

  const submitHandler = (data) => {
    if (type === "create") {
      createCategory(
        {
          category: data.title.trim(),
        },
        {
          onSuccess: () => {
            reset();
            close();
          },
        }
      );
    } else if (type === "update") {
      updateCategory(
        {
          title: data.title,
          categoryId: categoryId,
        },
        {
          onSuccess: () => {
            reset();
            close();
          },
        }
      );
    }
  };
  return (
    <form
      className="min-w-80 max-w-120 flex flex-col gap-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="text-xl font-semibold">
        {type === "create" ? "Add New Category" : "Update Category"}
      </h2>
      <AppInput
        title="title"
        register={register("title", {
          required: "Title is required",
        })}
        error={errors.title?.message}
      />
      <AppButton disabled={isCreatingCategory || isUpdating}>
        {type === "create" ? "Create" : "Update"}
      </AppButton>
    </form>
  );
}
