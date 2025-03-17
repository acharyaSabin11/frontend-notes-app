export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="/logo.png"
        alt="logo"
        className="size-10 lg:size-16 drop-shadow-lg"
      />
      <h1 className=" text-xl lg:text-2xl font-semibold ">Notes App</h1>
    </div>
  );
}
