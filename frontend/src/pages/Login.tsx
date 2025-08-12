import axios from "axios";
import { useState } from "react";
import "../styles/global.css";
import InputText from "../components/InputText";

const Login = () => {
  
  // Iniciar Sesión
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Crear Cuenta
  const [nombre, setNombre] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");


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
    <div className="bg-gray-900 flex flex-col justify-center items-center h-screen gap-5">
      <div className="flex gap-1 text-4xl outfit-black title-shadow">
        <p className="text-white">Tudu</p>
        <p className="text-violet-500">List</p>
      </div>
      <div className="bg-transparent w-[400px] h-[400px] perspective-[1000px]">
        <div
          className={`relative w-full h-full transition-transform duration-700 rounded-2xl transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Tarjeta de Inicio de Sesión (Front) */}
          <div className="absolute w-full h-full backface-hidden bg-slate-700 rounded-lg shadow-lg p-8 flex flex-col justify-center items-center gap-5">
            <h2 className="text-2xl outfit-bold mb-4 text-violet-500">
              Iniciar Sesión
            </h2>
            <form className="flex flex-col items-center gap-4 w-full">
              <InputText
                type="email"
                value={email}
                placeholder="Correo"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputText
                type="password"
                isPassword={true}
                value={password}
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-violet-600 w-1/3 !p-3 text-white outfit-bold hover:bg-violet-500 cursor-pointer rounded-2xl transition"
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={toggleFlip}
                className="text-violet-500 outfit-semibold hover:scale-105 transition-all cursor-pointer"
              >
                Crear Cuenta
              </button>
            </form>
          </div>

          {/* Tarjeta de Creación de Cuenta (Back) */}
          <div className="absolute w-full h-full gap-5 backface-hidden bg-violet-800 rounded-lg shadow-lg p-8 flex flex-col justify-center items-center [transform:rotateY(180deg)]">
            <h2 className="text-2xl font-bold text-white mb-4">Crear Cuenta</h2>
            <form className="flex flex-col items-center gap-4 w-full">
              <InputText
                type="text"
                value={nombre}
                placeholder="Nombre de usuario"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputText
                type="email"
                value={newEmail}
                placeholder="Correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputText
                type="password"
                value={newPassword}
                placeholder="Constraseña"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black w-1/3 outfit-bold text-white !p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
              >
                Registrarse
              </button>
              <button
                type="button"
                onClick={toggleFlip}
                className="text-white outfit-semibold hover:scale-105 transition-all cursor-pointer"
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
