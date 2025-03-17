import { NotebookPen } from "lucide-react";
import LoginForm from "../features/authentication/LoginForm";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-background flex ">
      <div className="bg-white flex-1 flex flex-col gap-8 px-8 py-6 md:p-10">
        <div className="flex flex-col gap-4 flex-1">
          <div className="md:hidden">
            <Logo />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center flex-1">
            <LoginForm />
            <p className="">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-primary font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex bg-background flex-1 p-10 lg:p-16 flex-col">
        <h1 className="text-4xl font-semibold flex gap-4  text-gray-100 items-center ">
          <img src="/logo.png" className="size-20" /> Notes App
        </h1>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-2xl text-white font-semibold">
            Welcome Back to NotesApp! Your Smart Note-Taking Companion!
          </p>
          <p className="text-xl text-white">
            Your notes are waiting for you! 📒✨
          </p>
        </div>
      </div>
    </div>
  );
}
