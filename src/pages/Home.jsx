import { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/modal/Modal";
import CreateAssignmentForm from "../components/assignment/CreateAssignmentForm";

const Home = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const isTeacher = user?.role === "teacher";

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {isTeacher && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Assignment
          </button>
        )}
      </div>

      <div className="text-gray-600">Assignment list will come here...</div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create Assignment"
        width="max-w-xl"
      >
        <CreateAssignmentForm
          onClose={() => setOpen(false)}
          onSuccess={() => {}}
        />
      </Modal>
    </div>
  );
};

export default Home;
