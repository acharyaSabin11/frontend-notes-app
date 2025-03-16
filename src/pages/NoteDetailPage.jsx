import { useParams } from "react-router-dom";
import useNoteDetail from "../features/notes/useNoteDetail";
import Spinner from "../components/spinner";

export default function NoteDetailPage() {
  const { id: noteId } = useParams();
  const { noteData, isGettingNote, isError } = useNoteDetail({ noteId });

  if (isGettingNote) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const { note, categories } = noteData;
  const { title, description, additional_info } = note;
  const categoriesNames = categories.map((category) => category.title);

  return (
    <div className="max-w-[70rem] h-full flex flex-col gap-10 p-4 mx-auto">
      <h1 className="text-4xl font-semibold capitalize self-center">{title}</h1>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-semibold">Description</h3>
        <p className="text-xl font-semibold">{description}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-semibold">Additional Info</h3>
        <p className="text-xl font-semibold">{additional_info}</p>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <h3 className="text-2xl font-semibold">Associated Categories</h3>
        <p className="text-xl font-semibold flex flex-wrap gap-2">
          {categoriesNames.length == 0 && (
            <div className="font-normal text-base">
              No associated categories found
            </div>
          )}
          {!categories.isEmpty &&
            categoriesNames.map((catName) => (
              <div className="px-4 py-1 text-xl font-semibold border-2 border-primary rounded-full text-primary">
                {catName}
              </div>
            ))}
        </p>
      </div>
    </div>
  );
}
