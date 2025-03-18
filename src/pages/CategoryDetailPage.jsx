import { Link, useNavigate, useParams } from "react-router-dom";
import useCategoryDetail from "../features/categories/useCategoryDetail";
import useDeleteCategory from "../features/categories/useDeleteCategory";
import { useState } from "react";
import CategoryForm from "../features/categories/CategoryForm";
import Spinner from "../components/spinner";
import AppButton from "../components/AppButton";
import { Pen, Trash } from "lucide-react";
import ModalWindow from "../components/modalWindow";
import Logo from "../components/Logo";

export default function CategoryDetailPage() {
  const { id: categoryId } = useParams();
  const {
    isLoadingCategory,
    isError,
    category: categoryData,
  } = useCategoryDetail({ categoryId });
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoadingCategory || isDeleting) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (!categoryData.category) {
    return <div>No category found </div>;
  }

  const { notes, category } = categoryData;
  const { title } = category;

  return (
    <div className="max-w-[70rem] h-full flex flex-col gap-6 p-4 mx-auto">
      <Logo />
      <h1 className="text-3xl font-semibold capitalize self-center text-center">{` ${title}`}</h1>
      {modelOpen && (
        <ModalWindow onClose={() => setModelOpen(false)}>
          <CategoryForm
            type="update"
            defVal={{
              title: title,
            }}
            close={() => setModelOpen(false)}
            categoryId={categoryId}
          />
        </ModalWindow>
      )}
      <div className="flex sm:justify-end justify-center gap-4">
        <AppButton
          disabled={isDeleting}
          onClick={() => {
            {
              setModelOpen(true);
            }
          }}
        >
          <div className="flex gap-2 items-center">
            <Pen size={16} strokeWidth={3} />
            <span>Edit</span>
          </div>
        </AppButton>
        <AppButton
          type="delete"
          disabled={isDeleting}
          onClick={() =>
            deleteCategory(category.id, {
              onSuccess: () => {
                navigate(-1);
              },
            })
          }
        >
          <div className="flex gap-2 items-center">
            <Trash size={16} strokeWidth={3} />
            <span>Delete</span>
          </div>
        </AppButton>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <h3 className="text-2xl font-semibold mb-4">
          Notes in {category.title}
        </h3>
        <div className="text-xl font-semibold flex flex-col gap-2">
          {notes.length == 0 && (
            <div className="font-normal text-base">
              No associated notes found
            </div>
          )}
          {!notes.isEmpty &&
            notes.map((note) => <Note key={note.id} note={note} />)}
        </div>
      </div>
    </div>
  );
}

function Note({ note }) {
  return (
    <Link
      to={`/notes/${note.id}`}
      className="bg-white min-w-[40rem] min-h-12 rounded-lg shadow-md w-full hover:shadow-lg cursor-pointer hover:shadow-primary transition-all duration-300 px-4 flex items-center"
    >
      <h2 className="text-xl font-semibold">{note.title}</h2>
    </Link>
  );
}
