import { useForm } from "react-hook-form";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import useCreateCategory from "./useCreateCategory";

export default function CategoryForm({ close }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { isCreatingCategory, createCategory } = useCreateCategory();

  const submitHandler = (data) => {
    createCategory(
      {
        category: data.title,
      },
      {
        onSuccess: () => {
          reset();
          close();
        },
      }
    );
  };
  return (
    <form
      className="min-w-80 max-w-120 flex flex-col gap-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="text-xl font-semibold">Add New Category</h2>
      <AppInput
        title="title"
        register={register("title", {
          required: "Title is required",
        })}
        error={errors.title?.message}
      />
      <AppButton disabled={isCreatingCategory}>Submit</AppButton>
    </form>
  );
}
