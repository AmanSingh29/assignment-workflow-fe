import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import { useApi } from "../../hooks/useApi";
import ASSIGNMENT_ENDPOINTS from "../../api/endpoints/assignment.endpoints";
import Modal from "../modal/Modal";
import CreateAssignmentForm from "./CreateAssignmentForm";
import ConfirmModal from "../common/ConfirmModal";
import SubmitAssignmentForm from "./SubmitAssignmentForm";

const AssignmentList = () => {
  const { callApi, loading } = useApi();
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  const fetchAssignments = async (pageNo = 1) => {
    try {
      const res = await callApi({
        url: ASSIGNMENT_ENDPOINTS.LIST,
        query: { page: pageNo, limit: 10 },
      });

      setAssignments(res.assignments);
      setPagination(res.pagination);
    } catch (err) {
      console.error("Fetch assignments error:", err);
    }
  };

  const handlePublish = async () => {
    try {
      await callApi({
        url: ASSIGNMENT_ENDPOINTS.PUBLISH(selected._id),
        method: "patch",
      });

      setPublishOpen(false);
      fetchAssignments(page);
    } catch (err) {
      console.error("Publish error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await callApi({
        url: ASSIGNMENT_ENDPOINTS.DELETE(selected._id),
        method: "delete",
      });

      setDeleteOpen(false);
      fetchAssignments(page);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchAssignments(page);
  }, [page]);

  if (loading)
    return (
      <p className="text-center text-sm text-gray-500">
        Loading assignments...
      </p>
    );

  if (!assignments?.length)
    return (
      <p className="text-center text-sm text-gray-500">No Assignments Found</p>
    );

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment._id}
          assignment={assignment}
          onEdit={(a) => {
            setSelected(a);
            setEditOpen(true);
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
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Assignment"
        width="max-w-xl"
      >
        <CreateAssignmentForm
          initialData={selected}
          onClose={() => setEditOpen(false)}
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
            onSuccess={() => {
              // later: refresh list / show success toast
            }}
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
  );
};

export default AssignmentList;
