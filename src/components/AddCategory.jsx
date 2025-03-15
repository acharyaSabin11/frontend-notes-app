import { useForm } from "react-hook-form";

export default function AddCategory() {
  const { register } = useForm();
  //   const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2 items-start">
      <button className="px-4 py-1 text-sm font-semibold  border-2  border-primary text-primary bg-transparent hover:bg-primary  hover:text-white rounded-full cursor-pointer">
        + Add Category
      </button>
      <AppInput title="Category" type="text" register={register("category")} />
    </div>
  );
}
