import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleScroll = (id: string) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <header className="fixed w-full bg-transparent bg-opacity-70 text-white flex justify-between items-center px-8 py-2 z-50">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        Frank is Dreaming
      </h1>

      <nav className="space-x-6 text-lg flex items-center">
        <button onClick={() => handleScroll("inicio")} className="hover:text-purple-400">Inicio</button>
        <button onClick={() => handleScroll("features")} className="hover:text-purple-400">Features</button>
        <button onClick={() => handleScroll("personajes")} className="hover:text-purple-400">Personajes</button>
        <button onClick={() => handleScroll("trailer")} className="hover:text-purple-400">Tráiler</button>
        <button onClick={() => handleScroll("suscribete")} className="hover:text-purple-400">Suscríbete</button>

        <Link to="/devlogs" className="hover:text-purple-400">Devlogs</Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin/devlogs" className="hover:text-yellow-400">Panel Admin</Link>
            )}
            <span className="ml-2 text-sm opacity-80">{user.username}</span>
            <button onClick={logout} className="hover:text-red-400 ml-4 transition-colors">
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-purple-400">Login</Link>
        )}
      </nav>
    </header>
  );
}