import Modal from "../modal/Modal";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="max-w-md">
      <p className="text-sm text-gray-600 mb-6">{message}</p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 cursor-pointer py-2 text-sm border rounded-md"
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 cursor-pointer text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Please wait..." : confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
