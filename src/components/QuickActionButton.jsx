export default function QuickActionButton({ text, onClick }) {
  return (
    <button
      className="lg:px-8 lg:py-2 px-4 py-1 text-sm lg:text-base rounded-full text-white font-semibold bg-primary border-4 border-primary-dark cursor-pointer hover:bg-primary-dark "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
