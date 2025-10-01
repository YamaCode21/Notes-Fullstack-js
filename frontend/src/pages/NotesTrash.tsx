import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import NoteList from '../components/NotesList';
import type { Note } from "../types/Notas";
import { useNavigate } from "react-router-dom";

const NotesTrash = () => {
  return (
    <div className="!ps-4 !pt-2 flex flex-col">
      <h1 className="text-2xl outfit-bold !mb-4 text-white">Papelera</h1>
    </div>
  );
};

export default NotesTrash;
