import { useState } from "react";
import { Menu, X, Home, ClipboardList } from "lucide-react";
import NavItem from "./NavItem";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={handleLogoClick}
            className="flex cursor-pointer items-center gap-2 text-indigo-600 font-bold text-lg"
          >
            <ClipboardList size={22} />
            AssignmentFlow
          </div>

          <div className="hidden md:flex items-center gap-4">
            <NavItem to="/" label="Home" icon={Home} />
            {user?.role === "student" && (
              <NavItem
                to="/my-submission"
                label="My Submissions"
                icon={ClipboardList}
              />
            )}
            <UserMenu />
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          <NavItem
            to="/"
            label="Home"
            icon={Home}
            onClick={() => setOpen(false)}
          />

          {user?.role === "teacher" && (
            <NavItem
              to="/"
              label="My Assignments"
              icon={ClipboardList}
              onClick={() => setOpen(false)}
            />
          )}

          <div className="pt-2 border-t">
            <UserMenu />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
