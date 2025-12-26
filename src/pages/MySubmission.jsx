import { useEffect, useState } from "react";
import ASSIGNMENT_ENDPOINTS from "../api/endpoints/assignment.endpoints";
import AssignmentCard from "../components/assignment/AssignmentCard";
import { useApi } from "../hooks/useApi";

const MySubmission = () => {
  const { callApi, loading } = useApi();
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchAssignments = async (pageNo = 1) => {
    try {
      const res = await callApi({
        url: ASSIGNMENT_ENDPOINTS.LIST,
        query: { page: pageNo, limit: 10, submittedOnly: true },
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

  if (loading)
    return (
      <p className="text-center mt-8 text-sm text-gray-500">
        Loading submissions...
      </p>
    );

  if (!assignments?.length)
    return (
      <p className="text-center text-sm text-gray-500">No Submissions Found</p>
    );

  return (
    <div className="space-y-4 p-6 max-w-7xl mx-auto">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment._id} assignment={assignment} />
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
    </div>
  );
};

export default MySubmission;
