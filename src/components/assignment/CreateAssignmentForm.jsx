import { useState } from "react";
import InputField from "../form/InputField";
import { useApi } from "../../hooks/useApi";
import ASSIGNMENT_ENDPOINTS from "../../api/endpoints/assignment.endpoints";

const CreateAssignmentForm = ({ onSuccess, onClose }) => {
  const { callApi, loading } = useApi();

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title) newErrors.title = "Title is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.due_date) newErrors.due_date = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await callApi({
        url: ASSIGNMENT_ENDPOINTS.CREATE,
        method: "post",
        body: form,
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Create assignment error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Title"
        placeholder="Assignment title"
        value={form.title}
        onChange={handleChange("title")}
        error={errors.title}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={handleChange("description")}
          rows={4}
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
            errors.description
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-indigo-300"
          }`}
          placeholder="Assignment description"
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      <InputField
        label="Due Date"
        type="date"
        value={form.due_date}
        onChange={handleChange("due_date")}
        error={errors.due_date}
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm border rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default CreateAssignmentForm;
