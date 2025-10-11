import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateDevlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/devlogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    navigate("/admin/devlogs");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Nuevo Devlog</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 rounded-lg text-black"
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-2 rounded-lg text-black h-40"
      />
      <button type="submit" className="px-4 py-2 bg-green-600 rounded-lg">
        Guardar
      </button>
    </form>
  );
}
