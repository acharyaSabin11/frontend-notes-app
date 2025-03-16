import { useNavigate, useParams } from "react-router-dom";
import useNoteDetail from "../features/notes/useNoteDetail";
import Spinner from "../components/spinner";
import AppButton from "../components/AppButton";
import { Pen, Trash } from "lucide-react";
import useDeleteNote from "../features/notes/useDeleteNote";

export default function NoteDetailPage() {
  const { id: noteId } = useParams();
  const { noteData, isGettingNote, isError } = useNoteDetail({ noteId });
  const { deleteNote, isDeleting } = useDeleteNote();
  const navigate = useNavigate();

  if (isGettingNote || isDeleting) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (!noteData.note) {
    return <div>No note found </div>;
  }

  const { note, categories } = noteData;
  const { title, description, additional_info } = note;

  return (
    <div className="max-w-[70rem] h-full flex flex-col gap-10 p-4 mx-auto">
      <h1 className="text-4xl font-semibold capitalize self-center">{title}</h1>
      <div className="flex justify-end gap-4">
        <AppButton disabled={isDeleting}>
          <div className="flex gap-2 items-center">
            <Pen size={16} strokeWidth={3} />
            <span>Edit</span>
          </div>
        </AppButton>
        <AppButton
          type="delete"
          disabled={isDeleting}
          onClick={() =>
            deleteNote(noteId, {
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
        <div className="text-xl font-semibold flex flex-wrap gap-2">
          {categories.length == 0 && (
            <div className="font-normal text-base">
              No associated categories found
            </div>
          )}
          {!categories.isEmpty &&
            categories.map((cat) => (
              <div
                key={cat.id}
                className="px-4 py-1 text-xl font-semibold border-2 border-primary rounded-full text-primary"
              >
                {cat.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
