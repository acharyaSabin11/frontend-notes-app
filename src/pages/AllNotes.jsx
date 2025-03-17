import { Link, useSearchParams } from "react-router-dom";
import AppButton from "../components/AppButton";
import FilterCategories from "../components/FilterCategories";
import Spinner from "../components/spinner";
import useAllNotes from "../features/notes/useAllNotes";
import SortBy from "../components/SortBy";

export default function AllNotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoadingNotes, isError, notes: data } = useAllNotes();

  if (isLoadingNotes) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div>
          <Spinner />
          <span>Loading Your Notes</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center">
        Something went wrong while loading your notes
      </div>
    );
  }

  const { notes, page, totalPages, totalCount } = data;

  return (
    <div className="max-w-[70rem] min-h-screen flex flex-col gap-10 p-4 mx-auto justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-semibold self-center">All Notes</h1>
        <SortBy />
        <FilterCategories />
        <Notes notes={notes} />
      </div>
      <div className="self-end flex gap-4 justify-between w-full">
        {page > 1 && (
          <AppButton
            onClick={() => {
              setSearchParams({ ...searchParams, page: page - 1 });
            }}
          >
            Prev
          </AppButton>
        )}
        <span className="self-center">
          Page {page} of {totalPages} ({totalCount} notes)
        </span>
        {page < totalPages && (
          <AppButton
            onClick={() => {
              setSearchParams({ ...searchParams, page: page + 1 });
            }}
          >
            Next
          </AppButton>
        )}
      </div>
    </div>
  );
}

function Notes({ notes }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Notes</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 && <div>No notes found</div>}
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

function Note({ note }) {
  return (
    <Link
      to={`/notes/${note.id}`}
      className="bg-white p-4 rounded-lg shadow-md w-full hover:shadow-lg cursor-pointer hover:shadow-primary transition-all duration-300"
    >
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p className="text-sm text-gray-500">{note.description}</p>
    </Link>
  );
}
