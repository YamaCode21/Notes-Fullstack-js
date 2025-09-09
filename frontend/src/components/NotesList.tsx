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
    <div className="flex flex-wrap justify-around">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white p-3 rounded shadow-md text-black max-w-96"
        >
          <h2 className="text-lg font-semibold">{note.title}</h2>
          <p>{note.content}</p>
          <small className="text-gray-500">
            Creada: {note.created_at}
          </small>
        </div>
      ))}
    </div>
  )
}

export default NoteList;