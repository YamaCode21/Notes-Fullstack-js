import type { FC } from "react";

type Notes = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

type NotesListProps = {
  notes: Notes[];
};

const NoteList: FC<NotesListProps> = ({ notes }) => {
  if (notes.length === 0) {
    return <p>No tienes notas registradas.</p>;
  }

  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li
          key={note.id}
          className="bg-white p-3 rounded shadow-md text-black"
        >
          <h2 className="text-lg font-semibold">{note.title}</h2>
          <p>{note.content}</p>
          <small className="text-gray-500">
            Creada: {note.created_at}
          </small>
        </li>
      ))}
    </ul>
  )
}

export default NoteList;