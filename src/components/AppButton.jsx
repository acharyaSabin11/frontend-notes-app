export default function AppButton({ children, disabled }) {
  return (
    <button
      className={`bg-primary hover:bg-primary-dark border-2 hover:border-primary text-white font-bold py-2 px-4 rounded cursor-pointer ${
        disabled ? "bg-gray-400" : ""
      }`}
    >
      {children}
    </button>
  );
}
