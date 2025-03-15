import { NotebookPen } from "lucide-react";
import LoginForm from "../features/authentication/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-background flex ">
      <div className="bg-white flex-1 flex flex-col gap-8 justify-center items-center p-10">
        <LoginForm />
        <p className="">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="bg-background flex-1 p-10">
        <h1 className="text-4xl font-semibold flex gap-4 items-center text-gray-100">
          <img src="/logo.png" className="size-20" /> Notes App
        </h1>
      </div>
    </div>
  );
}
