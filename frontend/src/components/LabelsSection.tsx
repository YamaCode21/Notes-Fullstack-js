import { useState } from "react";
import { Icon } from "@iconify/react";

const LabelsSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col outfit-medium !mb-1">
      {/* Botón */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex self-start items-center bg-gray-500 rounded-md !px-2 !py-1 transition-colors hover:bg-gray-600"
      >
        <Icon icon="icon-park-twotone:label" width="18" height="18" />
        <span className="ml-2">Etiquetas</span>
        <Icon
          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
          className="ml-auto"
        />
      </button>

      {/* Contenido expandible */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <button className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span> Rojo
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span> Verde
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span> Azul
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-500 rounded-full"></span> Amarillo
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LabelsSection;
