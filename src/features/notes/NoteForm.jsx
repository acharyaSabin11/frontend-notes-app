import { useForm } from "react-hook-form";
import AppInput from "../../components/AppInput";
import CategoriesSelector from "../../components/CategoriesSelector";
import AppButton from "../../components/AppButton";
import { useEffect, useState } from "react";
import useCategoriesData from "../categories/useCategoriesData";
import toast from "react-hot-toast";
import useCreateNote from "./useCreateNote";

export default function NoteForm({ close }) {
  const { register, handleSubmit, setValue, formState, watch, reset } =
    useForm();
  const [allowSubmit, setAllowSubmit] = useState(true);
  const { isCreatingNote, createNote } = useCreateNote();
  const sumbitHandler = (data) => {
    createNote(
      {
        title: data.title,
        description: data.description,
        additional_info: data.additional_info,
        categories: data.categories,
      },
      {
        onSuccess: () => {
          close();
          reset();
        },
      }
    );
  };

  const { categories, isGettingCategories, isError } = useCategoriesData();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load categories");
      close();
    }
  }, [isError, close]);

  return (
    <form
      className="min-w-80 max-w-120 flex flex-col gap-2"
      onSubmit={handleSubmit(sumbitHandler)}
    >
      <h2 className="text-xl font-semibold">Add New Note</h2>
      <AppInput title="title" register={register("title")} />
      <AppInput title="description" register={register("description")} />
      <AppInput
        title="Additional Info"
        register={register("additional_info")}
      />
      <CategoriesSelector
        categories={categories}
        register={register}
        setValue={setValue}
        formState={formState}
        allowSubmit={allowSubmit}
        setAllowSubmit={setAllowSubmit}
        watch={watch}
        isGettingCategories={isGettingCategories}
      />
      <AppButton disabled={!allowSubmit || isCreatingNote}>Submit</AppButton>
    </form>
  );
}
