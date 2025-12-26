import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import ASSIGNMENT_ENDPOINTS from "../api/endpoints/assignment.endpoints";
import AssignmentCard from "../components/assignment/AssignmentCard";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { callApi, loading, error } = useApi();

  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await callApi({
          url: ASSIGNMENT_ENDPOINTS.DETAILS(id),
        });

        setAssignment(res.assignment);
      } catch (err) {
        console.error("Fetch assignment details error:", err);
      }
    };

    fetchDetails();
  }, [id]);

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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <AssignmentCard assignment={assignment} showActions={false} />

      <div className="text-sm text-gray-500">
        Submissions will be rendered below...
      </div>
    </div>
  );
};

export default AssignmentDetails;
