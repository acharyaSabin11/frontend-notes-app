import { useForm } from "react-hook-form";
import AppInput from "../../components/AppInput";
import CategoriesSelector from "../../components/CategoriesSelector";
import AppButton from "../../components/AppButton";
import { useEffect, useState } from "react";
import useCategoriesData from "../categories/useCategoriesData";
import toast from "react-hot-toast";
import useCreateNote from "./useCreateNote";
import useUpdateNote from "./useUpdateNote";

export default function NoteForm({ close, type = "create", defVals, noteId }) {
  const { register, handleSubmit, setValue, formState, watch, reset } = useForm(
    { defaultValues: defVals }
  );
  const [allowSubmit, setAllowSubmit] = useState(true);
  const { isCreatingNote, createNote } = useCreateNote();
  const { isUpdatingNote, updateNote } = useUpdateNote();

  const sumbitHandler = (data) => {
    if (type === "create") {
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
    } else if (type === "update") {
      console.log(data);
      const changeObject = {};
      if (data.title !== defVals.title) {
        changeObject.title = data.title;
      }
      if (data.description !== defVals.description) {
        changeObject.description = data.description;
      }
      if (data.additional_info !== defVals.additional_info) {
        changeObject.additional_info = data.additional_info;
      }
      //categories to be deleted
      const categoriesToDelete = defVals.selectedCategories.filter(
        (c) => !data.categories.includes(c.id)
      );
      //categories to be added
      const categoriesToAdd = data.categories.filter(
        (c) => !defVals.selectedCategories.map((c) => c.id).includes(c)
      );
      if (categoriesToAdd.length > 0) {
        changeObject.addCategories = categoriesToAdd;
      }
      if (categoriesToDelete.length > 0) {
        changeObject.removeCategories = categoriesToDelete.map((c) => c.id);
      }
      console.log(changeObject);
      if (Object.keys(changeObject).length === 0) {
        toast.error("No changes made");
        return;
      }
      changeObject.noteId = noteId;
      changeObject.title = data.title;
      changeObject.description = data.description;
      changeObject.additional_info = data.additional_info;
      updateNote(changeObject, {
        onSuccess: () => {
          close();
          reset();
        },
      });
    }
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
      <h2 className="text-xl font-semibold">
        {type === "create" ? "Add New Note" : "Update Note"}
      </h2>
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
        defaultSelectedCategories={defVals?.selectedCategories}
      />
      <AppButton disabled={!allowSubmit || isCreatingNote || isUpdatingNote}>
        {type === "create" ? "Create" : "Update"}
      </AppButton>
    </form>
  );
}
