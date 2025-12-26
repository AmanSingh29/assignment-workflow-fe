import { Calendar, User, CheckCircle, Clock } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";

const SubmissionCard = ({ submission, onMarkReviewed, showActions = true }) => {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  const reviewed = submission.reviewed;

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          {submission.student && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <User size={16} />
              <span className="font-medium">{submission.student.name}</span>
              <span className="text-gray-500">
                ({submission.student.email})
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={14} />
            Submitted on {formatDate(submission.created_at)}
          </div>
        </div>

        <span
          className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md ${
            reviewed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {reviewed ? (
            <>
              <CheckCircle size={14} />
              Reviewed
            </>
          ) : (
            <>
              <Clock size={14} />
              Pending
            </>
          )}
        </span>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
        {submission.answer}
      </div>

      {showActions && isTeacher && !reviewed && (
        <div className="flex justify-end">
          <button
            onClick={() => onMarkReviewed?.(submission)}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Mark as Reviewed
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmissionCard;
