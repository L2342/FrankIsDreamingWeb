import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Devlog {
  _id: string;
  title: string;
  description: string;
  images?: string[];
  createdAt?: string;
}

export default function Devlogs() {
  const { user } = useContext(AuthContext);
  const [devlogs, setDevlogs] = useState<Devlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/devlogs");
        const json = await res.json();


        let data = [];

        if (Array.isArray(json)) {
          data = json;
        } else if (Array.isArray(json.data)) {
          data = json.data;
        } else if (json.data && Array.isArray(json.data.docs)) {
          data = json.data.docs;
        }

        if (data.length > 0) {
          setDevlogs(data);
        } else {
          setDevlogs([]);
        }
      } catch (err) {
        console.error(err);
        setError("Error de conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevlogs();
  }, []);


  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-purple-950 text-gray-400">
        Cargando devlogs...
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-purple-950 text-white text-center px-6">
        <p className="text-lg mb-4">{error}</p>
        <img
          src="SuscribeMovil.png"
          alt="Suscríbete"
          className="max-w-sm rounded-xl opacity-70"
        />
      </section>
    );
  }
  if (devlogs.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-purple-950 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(120,70,255,0.3),transparent_70%)]" />

        <h2 className="text-4xl font-bold text-purple-300 mb-4">Aún no hay devlogs</h2>
        <p className="text-lg mb-8 text-purple-300/80 italic tracking-wide max-w-md">
          Aún no hay recuerdos escritos en los sueños...
        </p>

        <img
          src="SuscribeMovil.png"
          alt="Suscríbete"
          className="max-w-sm rounded-xl opacity-70 mb-8"
        />

        {user?.role === "admin" && (
          <button
            onClick={() => (window.location.href = "/admin/devlogs")}
            className="px-6 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 transition-all shadow-lg shadow-purple-900/30 text-white font-semibold"
          >
            Crear el primer devlog ✍️
          </button>
        )}
      </section>
    );
  }


  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950 text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-12 text-center">Devlogs</h2>

        <div className="space-y-16">
          {devlogs.map((d) => (
            <article key={d._id} className="border-b border-white/10 pb-10">
              {d.images?.[0] && (
                <img
                  src={`http://localhost:5000/media/devlogs/${d.images[0]}`}
                  alt={d.title}
                  className="rounded-xl mb-6 w-full object-cover"
                />
              )}
              <h3 className="text-2xl font-bold mb-2">{d.title}</h3>
              {d.createdAt && (
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(d.createdAt).toLocaleDateString()}
                </p>
              )}
              <p className="text-gray-300 mb-4 line-clamp-3">{d.description}</p>
              <Link
                to={`/devlogs/${d._id}`}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Leer más →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
