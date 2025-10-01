import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../layouts/Navbar";
import CreateNoteButton from "../components/CreateNoteButton";
import CreateNoteModal from "../Modals/CreateNoteModal";
import { useEffect, useState } from "react";
import type { Note } from "../types/Notas";
import { useAuthStore } from "../store/authStore";

const DashboardLayout = () => {
  const token = useAuthStore((state) => state.token);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between h-screen bg-gray-100">
      <Sidebar />
      <div className="bg-gray-900 w-full h-full flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
        <CreateNoteButton onclick={() => setIsCreateNoteOpen(true)} />

        {isCreateNoteOpen && (
          <CreateNoteModal onClose={() => setIsCreateNoteOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
