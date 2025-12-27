import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import ASSIGNMENT_ENDPOINTS from "../api/endpoints/assignment.endpoints";
import AssignmentCard from "../components/assignment/AssignmentCard";
import SubmissionCard from "../components/suubmission/SubmissionCard";
import ConfirmModal from "../components/common/ConfirmModal";
import SUBMISSION_ENDPOINTS from "../api/endpoints/submission.endpoint";
import { showError, showSuccess } from "../utils/toast";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { callApi, loading } = useApi();

  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await callApi({
          url: ASSIGNMENT_ENDPOINTS.DETAILS(id),
        });

        setAssignment(res.assignment);
        setSubmissions(res.submissions || []);
      } catch (err) {
        showError(err);
      }
    };

    fetchDetails();
  }, [id]);

  const handleMarkReviewed = async () => {
    try {
      const res = await callApi({
        url: SUBMISSION_ENDPOINTS.MARK_REVIEWED(selectedSubmission._id),
        method: "patch",
      });

      setSubmissions((prev) =>
        prev.map((s) =>
          s._id === selectedSubmission._id ? { ...s, reviewed: true } : s
        )
      );
      showSuccess(res.message);
      setSubmissionOpen(false);
    } catch (err) {
      showError(err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">
        Loading assignment...
      </div>
    );
  }

  if (!assignment)
    return (
      <div className="p-6 text-center text-sm text-gray-500">
        Assignment Not Found!
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <AssignmentCard assignment={assignment} showActions={false} />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Submissions ({submissions.length})
        </h2>

        {submissions.length === 0 ? (
          <div className="text-sm text-gray-500">No submissions yet.</div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <SubmissionCard
                key={submission._id}
                submission={submission}
                onMarkReviewed={(submission) => {
                  setSelectedSubmission(submission);
                  setSubmissionOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={submissionOpen}
        title="Mark As Reviewed"
        message="Do You Want To Mark This Answer As Reviewed?"
        confirmText="Review"
        onClose={() => setSubmissionOpen(false)}
        onConfirm={handleMarkReviewed}
      />
    </div>
  );
};

export default AssignmentDetails;
