import { Icon } from "@iconify/react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import LabelsSection from "./LabelsSection";


const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="bg-slate-700 text-white w-64 h-full !py-4 flex flex-col items-center">
      <h3 className="outfit-bold text-xl">
        Tudu <span className="text-violet-500">List</span>
      </h3>

      <div className="flex flex-col justify-center h-full w-9/12">
        <div className="flex flex-col w-full">
          
          <LabelsSection />
          
          <nav className="flex flex-col outfit-medium w-9/12">
            <ul className="flex flex-col !px-2 gap-1">
              <li className="mb-2">
                <a href="/dashboard" className="flex items-center">
                  <Icon
                    icon="solar:notes-bold-duotone"
                    width="18"
                    height="18"
                  />{" "}
                  Notas
                </a>
              </li>
              <li className="mb-2">
                <a href="/papelera" className="flex items-center">
                  <Icon icon="solar:paper-bin-bold" width="18" height="18" />{" "}
                  Papelera
                </a>
              </li>
              <li className="mb-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center text-left cursor-pointer"
                >
                  <Icon icon="mdi:logout" width="18" height="18" />
                  <span className="ml-2">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
