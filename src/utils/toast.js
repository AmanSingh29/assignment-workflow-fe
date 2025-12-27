import { toast } from "react-toastify";

export const showSuccess = (message) => {
  toast.success(message || "Action completed successfully");
};

export const showError = (error) => {
  if (typeof error === "string") {
    toast.error(error);
    return;
  }

  const message =
    error?.response?.data?.message || error?.message || "Something went wrong";

  toast.error(message);
};

export const showInfo = (message) => {
  toast.info(message);
};

export const showWarning = (message) => {
  toast.warn(message);
};
