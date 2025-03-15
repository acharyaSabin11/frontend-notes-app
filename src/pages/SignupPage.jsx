import SignupForm from "../features/authentication/SignupForm";

export default function SignupPage() {
  return (
    <div className="h-screen w-screen bg-background flex ">
      <div className="bg-background flex-1 p-10">
        <h1 className="text-4xl font-semibold flex gap-4 items-center text-gray-100">
          <img src="/logo.png" className="size-20" /> Notes App
        </h1>
      </div>
      <div className="bg-white flex-1 flex flex-col justify-center items-center p-10">
        <SignupForm />
      </div>
    </div>
  );
}
