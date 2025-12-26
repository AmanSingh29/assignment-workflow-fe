import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Home from "../pages/Home";
import AssignmentDetails from "../pages/AssignmentDetails";
import MySubmission from "../pages/MySubmission";
import Auth from "../pages/Auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />

        <Route path="/assignment/:id" element={<AssignmentDetails />} />

        <Route element={<RoleRoute allowedRoles={["student"]} />}>
          <Route path="/my-submission" element={<MySubmission />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
