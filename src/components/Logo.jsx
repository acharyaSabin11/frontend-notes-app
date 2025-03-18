import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/dashboard"} className="flex items-center space-x-2">
      <img
        src="/logo.png"
        alt="logo"
        className="size-10 lg:size-16 drop-shadow-lg"
      />
      <h1 className=" text-xl lg:text-2xl font-semibold ">Notes App</h1>
    </Link>
  );
}
