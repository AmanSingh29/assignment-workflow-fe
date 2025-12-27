import {
  Calendar,
  Edit,
  Trash2,
  Upload,
  Send,
  Users,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusColor = {
  draft: "bg-gray-100 text-gray-700",
  published: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
};

const AssignmentCard = ({
  assignment,
  onPublish,
  onEdit,
  onDelete,
  onSubmit,
  showActions = true,
  onComplete,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isTeacher = user.role === "teacher";
  const isStudent = user.role === "student";
  const hasSubmitted = assignment.hasSubmitted === true;

  const submissionCount = assignment.submissionCount ?? 0;

  const showSubmissions =
    isTeacher && showActions && assignment.status !== "draft";

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {assignment.title}
        </h3>

        <span
          className={`px-2 py-1 text-xs rounded-md font-medium ${
            statusColor[assignment.status]
          }`}
        >
          {assignment.status.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {assignment.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar size={14} />
          Due: {formatDate(assignment.due_date)}
        </div>

        {showSubmissions && (
          <button
            onClick={() => navigate(`/assignment/${assignment._id}`)}
            title="View submissions"
            className="flex items-center gap-2 px-2.5 py-1 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md cursor-pointer hover:bg-indigo-100 hover:border-indigo-300 transition"
          >
            <Users size={16} />
            {submissionCount} submissions
          </button>
        )}
      </div>
      {showActions ? (
        <div className="flex items-center justify-end gap-3">
          {isStudent && (
            <>
              {!hasSubmitted ? (
                <button
                  onClick={() => onSubmit?.(assignment)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
                >
                  <Upload size={16} />
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/assignment/${assignment._id}`)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 cursor-pointer"
                >
                  <Upload size={16} />
                  Submitted · View Answer
                </button>
              )}
            </>
          )}

          {isTeacher && assignment.status === "draft" && (
            <>
              <button
                onClick={() => onEdit?.(assignment)}
                className="p-2 cursor-pointer rounded-md border hover:bg-gray-50"
                title="Edit"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() => onDelete?.(assignment)}
                className="p-2 cursor-pointer rounded-md border hover:bg-red-50 text-red-600"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>

              <button
                onClick={() => onPublish?.(assignment)}
                className="flex items-center cursor-pointer gap-2 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Send size={16} />
                Publish
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {isTeacher && assignment.status === "published" && (
            <button
              onClick={() => onComplete?.(assignment)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              <CheckCircle size={16} />
              Mark as Completed
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AssignmentCard;
