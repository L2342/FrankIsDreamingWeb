import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", { email, password });
      if (!res.data?.token) {
        throw new Error("Respuesta inválida del servidor");
      }

      await login(res.data.token);
      navigate("/");
    } catch (err: any) {
      console.error("Error en login:", err);

      // Toma mensaje del backend si existe
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Credenciales inválidas o error en el servidor";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1325] via-[#2d1e36] to-[#120b1a] text-white font-serif">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl mb-6 text-center font-bold text-purple-300">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-purple-200">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/40 focus:outline-none focus:border-purple-300 placeholder-purple-300/40"
              placeholder="tucorreo@email.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-purple-200">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/40 focus:outline-none focus:border-purple-300 placeholder-purple-300/40"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg ${
              loading
                ? "bg-purple-800 cursor-not-allowed opacity-70"
                : "bg-purple-600 hover:bg-purple-700"
            } transition-colors text-lg font-semibold`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-purple-400 hover:underline">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
