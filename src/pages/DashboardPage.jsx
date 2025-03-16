import { useSelector } from "react-redux";
import RecentNotes from "../features/dashboard/RecentNotes";
import RecentCategories from "../features/dashboard/RecentCategories";
import QuickActions from "../features/dashboard/QuickActions";
import ModalWindow from "../components/modalWindow";
import { useState } from "react";
import NoteForm from "../features/notes/NoteForm";
import CategoryForm from "../features/categories/CategoryForm";

export default function DashboardPage() {
  const [modelOpen, setModelOpen] = useState("");
  const username = useSelector((state) => state.auth.username);
  return (
    <div className="h-full w-full  flex flex-col items-center p-10 gap-6">
      <h1 className="text-4xl font-semibold">Welcome to Notes App</h1>
      <h2 className="text-2xl font-semibold self-start">Hi, {username}</h2>
      {modelOpen == "notes" && (
        <ModalWindow onClose={() => setModelOpen(false)}>
          <NoteForm />
        </ModalWindow>
      )}
      {modelOpen == "categories" && (
        <ModalWindow onClose={() => setModelOpen(false)}>
          <CategoryForm close={() => setModelOpen(false)} />
        </ModalWindow>
      )}
      <QuickActions setModelOpen={setModelOpen} />
      <RecentNotes />
      <RecentCategories />
    </div>
  );
}
