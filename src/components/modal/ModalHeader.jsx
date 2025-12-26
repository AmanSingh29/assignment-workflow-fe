import { X } from "lucide-react";

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ModalHeader;
