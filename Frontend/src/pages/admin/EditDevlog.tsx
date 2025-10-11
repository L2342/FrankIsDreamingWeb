import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDevlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevlog = async () => {
      const res = await fetch(`http://localhost:5000/api/devlogs/${id}`);
      const json = await res.json();
      setTitle(json.data.title);
      setContent(json.data.content);
    };
    fetchDevlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/devlogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    navigate("/admin/devlogs");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Editar Devlog</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 rounded-lg text-black"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-2 rounded-lg text-black h-40"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg">
        Actualizar
      </button>
    </form>
  );
}
