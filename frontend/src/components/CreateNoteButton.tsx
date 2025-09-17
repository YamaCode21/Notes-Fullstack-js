import { Icon } from "@iconify/react";

const CreateNoteButton = ({ onclick }: { onclick: () => void }) => {
  return (
    <button
      onClick={onclick}
      className="fixed flex flex-col items-center bottom-6 right-6 !p-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg shadow-xl hover:scale-110 hover:cursor-pointer transition-all"
    >
      <Icon icon="mdi:note-plus" width="40px" height="40px" />
    </button>
  );
};

export default CreateNoteButton;
