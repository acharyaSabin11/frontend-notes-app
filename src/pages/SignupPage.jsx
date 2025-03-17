import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/SignupForm";
import Logo from "../components/Logo";

export default function SignupPage() {
  return (
    <div className="h-screen w-screen bg-background flex ">
      <div className="bg-background flex-1 p-10 lg:p-16 hidden md:flex flex-col">
        <Logo />
        <div className="flex-1 flex flex-col justify-center">
          <div>
            <p className="text-2xl font-semibold text-white">
              Sign Up for NotesApp - Your Smart Note-Taking Companion!
            </p>
            <p className="text-xl text-white">
              Stay organized and never miss an idea!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-1 flex flex-col  p-10">
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center justify-center">
          <SignupForm />
          <p className="">
            Already have an account?
            <Link to={"/login"} className="text-primary font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
