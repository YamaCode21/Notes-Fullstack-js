import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../store/authStore";

const CreateNoteModal = ({
  onClose,
  onNoteCreated,
}: {
  onClose: () => void;
  onNoteCreated?: () => {};
}) => {
  const token = useAuthStore((state) => state.token);
  const [show, setShow] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Activa animación de aparición
    setShow(true);
  }, []);

  const handleClose = () => {
    // Activa animación de desaparición
    setShow(false);
    setTimeout(onClose, 300); // Espera a que termine la animación
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 👇 si tu backend usa JWT con `auth`, debes pasar el token aquí
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title,
          content,
          pinned: isPinned,
        }),
      });
      if (!res.ok) {
        throw new Error("Error al guardar la nota");
      }

      const newNote = await res.json();
      console.log("Nota creada:", newNote);

      if(onNoteCreated) onNoteCreated(); // refresca la lista de notas en el padre
      handleClose(); // cierra modal al guardar
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear la nota");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors duration-300 ${
        show ? "bg-black/50" : "bg-black/0"
      }`}
    >
      <div
        className={`bg-white relative outfit-medium !p-6 rounded-xl shadow-xl w-96 transform transition-all duration-300 ${
          show
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4"
        }`}
      >
        <h2 className="text-xl font-bold !mb-4 text-center">Crear Nota</h2>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título"
            name="tittle"
            onChange={(e) => setTitle(e.target.value)}
            className="border-1 border-gray-500 rounded-md !p-1"
          />
          <textarea
            name="content"
            className="w-full border !p-1 rounded-md"
            placeholder="Escribe tu nota aquí..."
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="!px-4 !py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="!px-4 !py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;
