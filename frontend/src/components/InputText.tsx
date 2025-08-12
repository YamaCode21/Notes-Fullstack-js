import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface InputTextProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
  isPassword?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  type,
  placeholder,
  onChange,
  className = "",
  value,
  isPassword,
}) => {
  const [showPass, setShowPass] = useState(false);

  const togglePassword = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <div className="relative shadow-lg w-3/4 bg-gray-800 outfit-medium rounded-md !px-2 !py-7 !pb-2">
      <input
        type={isPassword ? (showPass ? "text" : "password") : type}
        onChange={onChange}
        value={value}
        placeholder=" " // espacio para activar peer-placeholder-shown
        className={`peer w-full bg-gray-800 text-white text-md rounded focus:outline-none ${className}`}
      />
      <label
        className={`absolute w-full left-2 text-slate-500 transition-all duration-200 pointer-events-none
                    ${
                      value
                        ? "!top-1.5 text-sm text-slate-400" // ✨ Si hay valor, lo mantiene arriba
                        : "top-1/2 -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
                    }
                    peer-focus:top-4 peer-focus:text-sm peer-focus:text-slate-400
                    `}
      >
        {placeholder}
      </label>
      {isPassword === true && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
        >
          <Icon
            icon={showPass ? "mdi:eye" : "mdi:eye-off"}
            width="24"
            height="24"
            style={{ color: "#fff" }}
          />
        </button>
      )}
    </div>
  );
};

export default InputText;
