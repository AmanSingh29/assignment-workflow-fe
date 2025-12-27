import { useState } from "react";
import { Calendar } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { formatDate } from "../../utils/formatDate";
import SUBMISSION_ENDPOINTS from "../../api/endpoints/submission.endpoint";
import { showError, showSuccess } from "../../utils/toast";

const SubmitAssignmentForm = ({ assignment, onClose, onSuccess }) => {
  const { callApi, loading } = useApi();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError("Answer is required");
      return;
    }

    try {
      const res = await callApi({
        url: SUBMISSION_ENDPOINTS.SUBMIT(assignment._id),
        method: "post",
        body: { answer },
      });

      onSuccess?.();
      onClose();
      showSuccess(res.message);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">
          {assignment.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={14} />
          Due: {formatDate(assignment.due_date)}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Answer
        </label>

        <textarea
          rows={6}
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError(null);
          }}
          placeholder="Write your answer here..."
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-indigo-300"
          }`}
        />

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 cursor-pointer text-sm border rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 cursor-pointer text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default SubmitAssignmentForm;
