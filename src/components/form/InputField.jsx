import { useState } from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  startIcon: StartIcon,
  endIcon: EndIcon,
  onEndIconClick,
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        className={`flex items-center border rounded-lg px-3 py-2 bg-white focus-within:ring-2 ${
          error
            ? "border-red-500 focus-within:ring-red-300"
            : "border-gray-300 focus-within:ring-indigo-300"
        }`}
      >
        {StartIcon && <StartIcon className="text-gray-400 mr-2" size={18} />}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-sm"
        />

        {EndIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            className="ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
          >
            <EndIcon size={18} />
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
