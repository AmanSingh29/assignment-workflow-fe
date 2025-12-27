import { useCallback, useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

import InputField from "./InputField";
import SelectField from "./SelectField";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import AUTH_ENDPOINTS from "../../api/endpoints/auth.endpoints";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toast";

const roleOptions = [
  { label: "Teacher", value: "teacher" },
  { label: "Student", value: "student" },
];

const AuthForm = () => {
  const { callApi, loading } = useApi();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = useCallback(
    (key) => (e) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    },
    []
  );

  const validate = () => {
    const newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    if (!isLogin) {
      if (!form.name) newErrors.name = "Name is required";
      if (!form.role) newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await callApi({
        url: isLogin ? AUTH_ENDPOINTS.LOGIN : AUTH_ENDPOINTS.SIGNUP,
        method: "POST",
        body: form,
      });

      login({
        user: res.user,
        token: res.token,
      });
      showSuccess(res.message);
      navigate("/");
    } catch (err) {
      showError(err);
    }
  };

  const handleFormChange = () => {
    setIsLogin(!isLogin);
    setForm({});
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Login" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange("name")}
            startIcon={User}
            error={errors.name}
          />
        )}

        <InputField
          label="Email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange("email")}
          startIcon={Mail}
          error={errors.email}
        />

        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange("password")}
          startIcon={Lock}
          endIcon={showPassword ? EyeOff : Eye}
          onEndIconClick={() => setShowPassword(!showPassword)}
          error={errors.password}
        />

        {!isLogin && (
          <SelectField
            label="Role"
            options={roleOptions}
            value={form.role}
            onChange={handleChange("role")}
            error={errors.role}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={handleFormChange}
          className="text-indigo-600 cursor-pointer hover:underline font-medium"
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
