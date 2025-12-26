import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, icon: Icon, onClick }) => {
  const commonClasses =
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${commonClasses} text-gray-700 hover:bg-gray-100`}
      >
        {Icon && <Icon size={18} />}
        {label}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${commonClasses} ${
          isActive
            ? "bg-indigo-100 text-indigo-700"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {Icon && <Icon size={18} />}
      {label}
    </NavLink>
  );
};

export default NavItem;
