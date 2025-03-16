import { useForm } from "react-hook-form";
import AppInput from "../../components/AppInput";
import CategoriesSelector from "../../components/CategoriesSelector";
import AppButton from "../../components/AppButton";
import { useState } from "react";

export default function NoteForm() {
  const { register, handleSubmit, setValue, formState, watch } = useForm();
  const [allowSubmit, setAllowSubmit] = useState(true);
  const sumbitHandler = (data) => {
    console.log(data);
  };

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
        register={register}
        setValue={setValue}
        formState={formState}
        allowSubmit={allowSubmit}
        setAllowSubmit={setAllowSubmit}
        watch={watch}
      />
      <AppButton disabled={!allowSubmit}>Save</AppButton>
    </form>
  );
}
