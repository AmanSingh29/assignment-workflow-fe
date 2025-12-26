const SUBMISSION_ENDPOINTS = {
  SUBMIT: (assignmentId) => `/v1/submission/${assignmentId}`,
  MARK_REVIEWED: (assignmentId) => `/v1/submission/review/${assignmentId}`,
};

export default SUBMISSION_ENDPOINTS;
