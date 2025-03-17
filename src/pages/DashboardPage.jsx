import { useSelector } from "react-redux";
import RecentNotes from "../features/dashboard/RecentNotes";
import RecentCategories from "../features/dashboard/RecentCategories";
import QuickActions from "../features/dashboard/QuickActions";
import ModalWindow from "../components/modalWindow";
import { useState } from "react";
import NoteForm from "../features/notes/NoteForm";
import CategoryForm from "../features/categories/CategoryForm";
import NotesSearchBar from "../components/NotesSearchBar";
import Logo from "../components/Logo";
import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
  const [modelOpen, setModelOpen] = useState("");
  const username = useSelector((state) => state.auth.username);
  return (
    <div className="min-h-full w-full  flex flex-col items-center p-10 gap-6 py-10 no-scrollbar">
      <div className="flex justify-between w-full items-center">
        <Logo />
        <h1 className="text-4xl font-semibold mr-40">Welcome to Notes App</h1>
        <LogoutButton />
      </div>
      <NotesSearchBar />
      <h2 className="text-2xl font-semibold self-start">Hi, {username}</h2>
      {modelOpen == "notes" && (
        <ModalWindow onClose={() => setModelOpen(false)}>
          <NoteForm close={() => setModelOpen(false)} />
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
