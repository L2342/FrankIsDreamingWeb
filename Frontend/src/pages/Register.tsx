import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { username: name, email, password });
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error al registrarse");
      setSuccess(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1325] via-[#2d1e36] to-[#120b1a] text-white font-serif overflow-hidden">
      {/* === Mensajes de estado === */}
      {success && (
        <div className="absolute top-10 z-50 bg-green-600/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-green-400/40 text-center animate-fadeInDown">
          <p className="text-lg font-semibold text-white">✅ Registro exitoso</p>
          <p className="text-sm text-green-200">Redirigiendo al inicio de sesión...</p>
        </div>
      )}

      {error && !success && (
        <div className="absolute top-10 z-50 bg-red-600/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-red-400/40 text-center animate-fadeInDown">
          <p className="text-lg font-semibold text-white">⚠️ Error</p>
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {/* === Contenedor del formulario === */}
      <div className="relative bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 z-10">
        <h2 className="text-3xl mb-6 text-center font-bold text-purple-300">Crear cuenta</h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-purple-200">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/40 focus:outline-none focus:border-purple-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-purple-200">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/40 focus:outline-none focus:border-purple-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-purple-200">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/40 focus:outline-none focus:border-purple-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-lg font-semibold"
          >
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
}
