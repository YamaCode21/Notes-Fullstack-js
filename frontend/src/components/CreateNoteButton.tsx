import { Icon } from "@iconify/react";

const CreateNoteButton = ({ onclick }: { onclick: () => void }) => {
  return (
    <button onClick={onclick} className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
      <Icon icon="mdi:note-plus" />
      Create Note
    </button>
  );
};

export default CreateNoteButton;