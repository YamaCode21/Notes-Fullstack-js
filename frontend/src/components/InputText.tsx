import React from "react";
import { Icon } from "@iconify/react";

interface InputTextProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputText: React.FC<InputTextProps> = ({
  type,
  placeholder,
  onChange,
  className = "",
}) => {
  return (
    <div className="relative bg-gray-800 outfit-medium rounded-md !px-2 !py-7 !pb-2">
      <input
        type={type}
        onChange={onChange}
        placeholder=" " // espacio para activar peer-placeholder-shown
        className={`peer w-full bg-gray-800 text-white text-md rounded focus:outline-none ${className}`}
      />
      <label
        className="absolute left-2 text-slate-500 transition-all duration-200  pointer-events-none
                   top-1/2 -translate-y-1/2
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg 
                   peer-focus:top-4 peer-focus:text-sm peer-focus:text-slate-400"
      >
        {placeholder} <button><Icon icon="mdi:eye-off" width="24" height="24" style={{ color: "#fff" }}  /></button>
      </label>
    </div>
  );
};

export default InputText;
