export default function AppButton({
  children,
  disabled,
  type = "normal",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        type == "delete"
          ? "bg-red-500 hover:bg-red-600 border-2 border-red-500"
          : "bg-primary hover:bg-primary-dark border-2 border-primary"
      } text-white font-bold lg:py-2 lg:px-4 py-1 px-4 text-sm lg:text-base rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-0
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
