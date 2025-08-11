import axios from "axios";
import { useState } from "react";
import "../styles/global.css";
import InputText from "../components/InputText";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log("Login successful:", response.data);
      // Redirect or update state as needed
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-950 flex flex-col justify-center items-center h-screen gap-5">
      <div className="flex gap-1 text-4xl outfit-black title-shadow">
        <p className="text-white">Tudu</p>
        <p className="text-purple-500">List</p>
      </div>
      <div className="bg-transparent w-[300px] h-[400px] perspective-[1000px]">
        <div
          className={`relative w-full h-full transition-transform duration-700 rounded-2xl transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Tarjeta de Inicio de Sesión (Front) */}
          <div className="absolute w-full h-full backface-hidden bg-gray-700 rounded-lg shadow-lg p-8 flex flex-col justify-center items-center gap-5">
            <h2 className="text-2xl outfit-bold mb-4 text-purple-500">
              Iniciar Sesión
            </h2>
            <form className="flex flex-col items-center gap-4 w-full">
              <InputText
                type="email"
                placeholder="Correo"
                onChange={() => {}}
              />
              <InputText
                type="password"
                placeholder="Contraseña"
                onChange={() => {}}
              />
              <button
                type="submit"
                className="bg-blue-500 w-1/2 !p-1 text-white rounded hover:bg-blue-600 transition"
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={toggleFlip}
                className="text-blue-500 hover:underline"
              >
                Crear Cuenta
              </button>
            </form>
          </div>

          {/* Tarjeta de Creación de Cuenta (Back) */}
          <div className="absolute w-full h-full gap-5 backface-hidden bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center items-center [transform:rotateY(180deg)]">
            <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
            <form className="flex flex-col items-center gap-4 w-full">
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                Registrarse
              </button>
              <button
                type="button"
                onClick={toggleFlip}
                className="text-blue-500 hover:underline"
              >
                Volver a Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
