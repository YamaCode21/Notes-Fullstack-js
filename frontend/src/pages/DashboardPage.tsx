import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import NoteList from "../components/NotesList";
import type { Note } from "../types/Notas";
import { useNavigate } from "react-router-dom";
import CreateNoteButton from "../components/CreateNoteButton";
import CreateNoteModal from "../Modals/CreateNoteModal";

const DashboardPage = () => {
  const token = useAuthStore((state) => state.token);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return null; // evita renderizar el dashboard
  }

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) throw new Error("Error al obtener las notas");

      const data: Note[] = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  return (
    <DashboardLayout>
      <div className="!ps-4 !pt-2 flex flex-col">
        <h1 className="text-2xl outfit-bold !mb-4 text-white">Mis Notas</h1>

        {loading && <p>Cargando notas...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && <NoteList notes={notes} />}
        <CreateNoteButton onclick={() => setIsCreateNoteOpen(true)} />

        {isCreateNoteOpen && (
          <CreateNoteModal onClose={() => setIsCreateNoteOpen(false)} onNoteCreated={fetchNotes} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
