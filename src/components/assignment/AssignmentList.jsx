import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import { useApi } from "../../hooks/useApi";
import ASSIGNMENT_ENDPOINTS from "../../api/endpoints/assignment.endpoints";
import Modal from "../modal/Modal";
import CreateAssignmentForm from "./CreateAssignmentForm";
import ConfirmModal from "../common/ConfirmModal";
import SubmitAssignmentForm from "./SubmitAssignmentForm";
import { useAuth } from "../../context/AuthContext";
import { Plus } from "lucide-react";
import SelectField from "../form/SelectField";
import { useCallback } from "react";
import { showError, showSuccess } from "../../utils/toast";

const AssignmentList = () => {
  const { callApi, loading } = useApi();
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selected, setSelected] = useState(null);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [filter, setFilter] = useState({});

  const isTeacher = user?.role === "teacher";

  const fetchAssignments = async (pageNo = 1) => {
    try {
      const res = await callApi({
        url: ASSIGNMENT_ENDPOINTS.LIST,
        query: { page: pageNo, limit: 10, ...filter },
      });

      setAssignments(res.assignments);
      setPagination(res.pagination);
    } catch (err) {
      showError(err);
    }
  };

  const handlePublish = async () => {
    try {
      const res = await callApi({
        url: ASSIGNMENT_ENDPOINTS.PUBLISH(selected._id),
        method: "patch",
      });

      setPublishOpen(false);
      fetchAssignments(page);
      showSuccess(res.message);
    } catch (err) {
      showError(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await callApi({
        url: ASSIGNMENT_ENDPOINTS.DELETE(selected._id),
        method: "delete",
      });

      setDeleteOpen(false);
      fetchAssignments(page);
      showSuccess(res.message);
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    fetchAssignments(page);
  }, [page, filter]);

  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Completed", value: "completed" },
  ];

  const handleStatusChange = useCallback(
    (key) => (e) => {
      setFilter((prev) => ({ ...prev, [key]: e.target.value }));
    },
    []
  );

  let loadingContent;

  if (loading)
    loadingContent = (
      <p className="text-center text-sm text-gray-500">
        Loading assignments...
      </p>
    );

  if (!loading && !assignments?.length)
    loadingContent = (
      <p className="text-center text-sm text-gray-500">No Assignments Found</p>
    );

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {isTeacher && (
          <div className="flex flex-row gap-4">
            <div className="w-52">
              <SelectField
                placeHolder="Select Status"
                options={statusOptions}
                value={filter.status}
                onChange={handleStatusChange("status")}
              />
            </div>
            <button
              onClick={() => setAssignmentModalOpen(true)}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus size={18} />
              Create Assignment
            </button>
          </div>
        )}
      </div>
      {loadingContent ? (
        loadingContent
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onEdit={(a) => {
                setSelected(a);
                setAssignmentModalOpen(true);
              }}
              onPublish={(a) => {
                setSelected(a);
                setPublishOpen(true);
              }}
              onDelete={(a) => {
                setSelected(a);
                setDeleteOpen(true);
              }}
              onSubmit={(a) => {
                setSelected(a);
                setSubmitOpen(true);
              }}
            />
          ))}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border cursor-pointer rounded-md disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-3 py-1 text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 cursor-pointer border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
          <Modal
            isOpen={assignmentModalOpen}
            onClose={() => setAssignmentModalOpen(false)}
            title={selected ? "Edit" : "Create" + "Assignment"}
            width="max-w-xl"
          >
            <CreateAssignmentForm
              initialData={selected}
              onClose={() => setAssignmentModalOpen(false)}
              onSuccess={() => fetchAssignments(page)}
            />
          </Modal>

          <Modal
            isOpen={submitOpen}
            onClose={() => setSubmitOpen(false)}
            title="Submit Assignment"
            width="max-w-xl"
          >
            {selected && (
              <SubmitAssignmentForm
                assignment={selected}
                onClose={() => setSubmitOpen(false)}
                onSuccess={() => fetchAssignments(page)}
              />
            )}
          </Modal>

          <ConfirmModal
            isOpen={publishOpen}
            title="Publish Assignment"
            message="Once published, you cannot edit this assignment. Continue?"
            confirmText="Publish"
            onClose={() => setPublishOpen(false)}
            onConfirm={handlePublish}
          />

          <ConfirmModal
            isOpen={deleteOpen}
            title="Delete Assignment"
            message="This action cannot be undone. Delete this assignment?"
            confirmText="Delete"
            onClose={() => setDeleteOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </>
  );
};

export default AssignmentList;
