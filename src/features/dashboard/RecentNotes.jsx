import Spinner from "../../components/spinner";
import useRecentNotes from "./useRecentNotes";

export default function RecentNotes() {
  const { notes, isFetchingRecentNotes, isError } = useRecentNotes();
  return (
    <div className="h-full w-full  flex flex-col items-start  gap-6">
      <h1 className="text-2xl font-semibold">Recent Notes</h1>
      {isFetchingRecentNotes ? (
        <Spinner />
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.length === 0 && <div>No notes found</div>}
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow-md w-full"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-500">{note.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
