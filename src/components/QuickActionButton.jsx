export default function QuickActionButton({ text, onClick }) {
  return (
    <button
      className="px-8 py-2 rounded-full text-white font-semibold bg-primary border-4 border-primary-dark cursor-pointer hover:bg-primary-dark "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
