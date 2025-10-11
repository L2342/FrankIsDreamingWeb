import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Devlog {
  _id: string;
  title: string;
  content: string;
  images?: string[];
  createdAt?: string;
  comments?: Comment[];
}

export default function DevlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [devlog, setDevlog] = useState<Devlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  // --- Cargar el devlog ---
  useEffect(() => {
    const fetchDevlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/devlogs/${id}`);
        const json = await res.json();

        console.log("🧩 Respuesta del servidor (detalle):", json);

        let data: Devlog | null = null;
        if (json && json.status === "success") {
          if (json.data && !json.data.devlog) data = json.data;
          else if (json.data && json.data.devlog) data = json.data.devlog;
          else if (json.devlog) data = json.devlog;
        } else if (json._id) {
          data = json;
        }

        if (data) setDevlog(data);
        else setError("No se encontró el devlog solicitado.");
      } catch (err) {
        console.error("Error al obtener devlog:", err);
        setError("Error al cargar el devlog.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevlog();
  }, [id]);

  // --- Enviar comentario ---
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setSubmitting(true);

      const res = await fetch(`http://localhost:5000/api/devlogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      const json = await res.json();
      console.log("📩 Respuesta al comentar:", json);

      if (json.status === "success" && json.data) {
        // Actualiza la lista de comentarios sin recargar
        setDevlog((prev) =>
          prev
            ? { ...prev, comments: [json.data, ...(prev.comments || [])] }
            : prev
        );
        setComment("");
      } else {
        alert(json.message || "No se pudo publicar el comentario.");
      }
    } catch (err) {
      console.error("❌ Error al enviar comentario:", err);
      alert("Error al enviar el comentario.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Loading ---
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-purple-950 text-gray-400">
        Cargando devlog...
      </section>
    );
  }

  // --- Error ---
  if (error || !devlog) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-purple-950 text-white text-center px-6">
        <p className="text-lg mb-4">{error || "Devlog no encontrado."}</p>
        <img
          src="/assets/SuscribeMovil.png"
          alt="Error"
          className="max-w-sm rounded-xl opacity-70"
        />
      </section>
    );
  }

  // --- Render principal ---
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950 text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{devlog.title}</h1>
        <p className="text-sm text-gray-400 mb-8">
          {devlog.createdAt && new Date(devlog.createdAt).toLocaleDateString()}
        </p>

        {devlog.images?.length ? (
          devlog.images.map((img) => (
            <img
              key={img}
              src={`http://localhost:5000/media/devlogs/${img}`}
              alt="Imagen del devlog"
              className="rounded-xl mb-6 w-full object-cover"
            />
          ))
        ) : (
          <div className="rounded-xl mb-6 w-full bg-gray-800 h-64 flex items-center justify-center text-gray-500 italic">
            Sin imágenes
          </div>
        )}

        <article className="prose prose-invert max-w-none mb-12 leading-relaxed">
          {devlog.content ? (
            <p>{devlog.content}</p>
          ) : (
            <p className="text-gray-400 italic">Este devlog no tiene contenido aún.</p>
          )}
        </article>

        <h2 className="text-2xl font-semibold mb-6">Comentarios</h2>

        {/* Lista de comentarios */}
        <div className="space-y-4 mb-10">
          {devlog.comments && devlog.comments.length > 0 ? (
            devlog.comments.map((c) => (
              <div key={c._id} className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-purple-300 mb-1">{c.author}</p>
                <p className="text-gray-200">{c.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No hay comentarios todavía.</p>
          )}
        </div>

        {/* Formulario de nuevo comentario */}
        {token ? (
          <form
            onSubmit={handleCommentSubmit}
            className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none mb-4"
              rows={4}
            />
            <button
              type="submit"
              disabled={submitting}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                submitting
                  ? "bg-purple-900 text-gray-400"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {submitting ? "Enviando..." : "Publicar comentario"}
            </button>
          </form>
        ) : (
          <div className="bg-white/5 p-6 rounded-xl text-center">
            <p className="mb-4 text-gray-300">
              Inicia sesión para dejar un comentario.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition"
            >
              Ir al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
