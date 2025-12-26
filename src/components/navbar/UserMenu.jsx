import { LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const UserMenu = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <User size={18} />
        <span className="font-medium">{user.name}</span>
      </div>

      <button
        onClick={logout}
        className="flex items-center cursor-pointer gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
