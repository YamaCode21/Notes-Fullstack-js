import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useState, type FC } from "react";
import type { Note } from "../types/Notas";
import { Icon } from "@iconify/react";

type NotesListProps = {
  notes: Note[];
  onUpdate?: (note: Note) => void;
  onDelete?: (noteId: number) => void;
  refreshNotes?: () => void;
};

const NoteList: FC<NotesListProps> = ({ notes, onUpdate, onDelete, refreshNotes }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [show, setShow] = useState(false);

  const openModal = (note: Note) => {
    setSelectedNote(note);
    setIsPinned(note.pinned);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setShow(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setEditedTitle("");
    setEditedContent("");
    setShow(false);
  };

  const handleSave = () => {
    if (selectedNote && onUpdate) {
      onUpdate({
        ...selectedNote,
        title: editedTitle,
        content: editedContent,
        pinned: isPinned,
      });
    }
    if (refreshNotes) refreshNotes();
    closeModal();
  };

  const handleDelete = () => {
    if (selectedNote && onDelete) {
      onDelete(selectedNote.id);
      if (refreshNotes) refreshNotes();
      closeModal();
    }
  };

  if (notes.length === 0) {
    return <p>No tienes notas registradas.</p>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-around gap-5 outfit-regular">
        {notes.map((note) => (
          <div
            key={note.id}
            data-aos="flip-left"
            onClick={() => openModal(note)}
            className="bg-white relative !p-3 rounded-xl shadow-lg text-black min-w-60 max-w-60 min-h-64 max-h-64"
          >
            <small className="text-gray-500">
              {formatDistanceToNow(new Date(note.created_at), {
                addSuffix: true,
                locale: es,
              })}
            </small>
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <hr className="!my-1 border-gray-200" />
            <p className="line-clamp-6 overflow-hidden text-ellipsis">
              {note.content}
            </p>
            <small className="text-gray-500 absolute bottom-2">
              Creada: {new Date(note.created_at).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center transition-colors duration-300 outfit-regular ${
          show ? "bg-black/50" : "bg-black/0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white !p-6 rounded-xl shadow-xl w-96 relative transform transition-all duration-300 ${
            show
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-4"
          }`}
        >
          <div>
            <h2 className="text-xl font-bold">Editar Nota</h2>
            <button
              role="checkbox"
              aria-checked={isPinned}
              onClick={() => setIsPinned(!isPinned)}
              className="top-6 right-5 absolute rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Icon
                icon="mdi:pin"
                width="28"
                height="28"
                className={isPinned ? "text-black" : "text-gray-400"}
              />
            </button>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor=""
            >
              Título:
            </label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border rounded-md p-2 mb-3"
            />

            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor=""
            >
              Contenido:
            </label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border rounded-md p-2 h-32 mb-4"
            />

            <button className="absolute bottom-7.5 left-7" onClick={handleDelete}>
              <Icon
                icon="tabler:trash"
                width="28"
                height="28"
                className="text-red-400 transition-colors duration-300 hover:text-red-600 cursor-pointer"
              />
            </button>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="!px-4 !py-2 bg-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="!px-4 !py-2 bg-violet-600 text-white rounded-md"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteList;
