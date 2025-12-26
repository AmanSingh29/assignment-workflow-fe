import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import { useApi } from "../../hooks/useApi";
import ASSIGNMENT_ENDPOINTS from "../../api/endpoints/assignment.endpoints";

const AssignmentList = () => {
  const { callApi, loading } = useApi();
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

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

  useEffect(() => {
    fetchAssignments(page);
  }, [page]);

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment._id}
          assignment={assignment}
          onPublish={(a) => console.log("Publish assignment", a._id)}
          onEdit={(a) => console.log("Edit assignment", a._id)}
          onDelete={(a) => console.log("Delete assignment", a._id)}
          onSubmit={(a) => console.log("Submit assignment", a._id)}
        />
      ))}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1 text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {loading && (
        <p className="text-center text-sm text-gray-500">
          Loading assignments...
        </p>
      )}
    </div>
  );
};

export default AssignmentList;
