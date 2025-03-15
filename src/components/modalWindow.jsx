export default function ModalWindow({ children, onClose }) {
  return (
    <div className="absolute h-full w-full left-0 top-0 flex items-center justify-center backdrop-blur-sm bg-black/10 ">
      <div className="bg-white p-8 rounded-lg shadow-lg relative min-w-40 min-h-20 ">
        <button
          className="absolute top-4 right-6 text-2xl text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
