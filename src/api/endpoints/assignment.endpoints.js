const ASSIGNMENT_ENDPOINTS = {
  CREATE: "/v1/assignment/create",
  LIST: "/v1/assignment",
  UPDATE: (assignmentId) => `/v1/assignment/update/${assignmentId}`,
  PUBLISH: (assignmentId) => `/v1/assignment/publish/${assignmentId}`,
  DELETE: (assignmentId) => `/v1/assignment/delete/${assignmentId}`,
};

export default ASSIGNMENT_ENDPOINTS;
