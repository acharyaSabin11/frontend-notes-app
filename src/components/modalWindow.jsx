import { useEffect } from "react";

export default function ModalWindow({ children, onClose }) {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when the modal unmounts
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="absolute h-full w-full left-0 top-0 flex items-center justify-center backdrop-blur-sm bg-black/10  ">
      <div className="bg-white p-8 rounded-lg shadow-lg relative min-w-40 min-h-20 max-h-full overflow-y-auto no-scrollbar">
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
