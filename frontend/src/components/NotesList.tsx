import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { FC } from "react";
import type { Note } from '../types/Notas';

type NotesListProps = {
  notes: Note[];
};

const NoteList: FC<NotesListProps> = ({ notes }) => {
  if (notes.length === 0) {
    return <p>No tienes notas registradas.</p>;
  }

  return (
    <div className="flex flex-wrap justify-around gap-5">
      {notes.map((note) => (
        <div
          key={note.id}
          data-aos="flip-left"
          className="bg-white relative !p-3 rounded-xl shadow-lg text-black min-w-60 max-w-60 min-h-64 max-h-64"
        >
          <small className="text-gray-500">{formatDistanceToNow(new Date(note.created_at), { addSuffix: true, locale: es })}</small>
          <h2 className="text-lg font-semibold">{note.title}</h2>
          <hr className="!my-1 border-gray-200" />
          <p className="line-clamp-6 overflow-hidden text-ellipsis">{note.content}</p>
          <small className="text-gray-500 absolute bottom-2">
            Creada: {new Date(note.created_at).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  )
}

export default NoteList;