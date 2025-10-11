import { useState, useEffect } from "react";
import api from "../../api/client";

interface Devlog {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

export default function AdminDevlogs() {
    const [devlogs, setDevlogs] = useState<Devlog[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchDevlogs = async () => {
        try {
            const res = await api.get("/devlogs");

            let data = [];

            // Detección flexible del formato del backend
            if (Array.isArray(res.data)) {
                data = res.data;
            } else if (Array.isArray(res.data.devlogs)) {
                data = res.data.devlogs;
            } else if (res.data.data && Array.isArray(res.data.data.docs)) {
                data = res.data.data.docs;
            }

            setDevlogs(data);
        } catch (err) {
            console.error("Error al cargar devlogs:", err);
            setDevlogs([]); // Previene que sea undefined
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await api.put(`/devlogs/edit/${editingId}`, { title, content });
            setEditingId(null);
        } else {
            await api.post("/devlogs/create", { title, content });
        }
        setTitle("");
        setContent("");
        fetchDevlogs();
    };

    const handleEdit = (devlog: Devlog) => {
        setEditingId(devlog._id);
        setTitle(devlog.title);
        setContent(devlog.content);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Seguro que deseas eliminar este devlog?")) {
            await api.delete(`/devlogs/delete/${id}`);
            fetchDevlogs();
        }
    };

    useEffect(() => {
        fetchDevlogs();
    }, []);

    return (
        <section className="min-h-screen bg-black text-white px-8 py-12">
            <h2 className="text-3xl font-bold mb-6">Panel de administración - Devlogs</h2>

            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-2xl mb-8 space-y-4 w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <textarea
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded font-semibold"
                >
                    {editingId ? "Actualizar Devlog" : "Crear Devlog"}
                </button>
            </form>

            <div className="space-y-4">
                {Array.isArray(devlogs) && devlogs.length > 0 ? (
                    devlogs.map((devlog) => (
                        <div
                            key={devlog._id}
                            className="bg-gray-800 rounded-xl p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-bold">{devlog.title}</h3>
                                <p className="text-sm opacity-70">
                                    {new Date(devlog.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(devlog)}
                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(devlog._id)}
                                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 italic">No hay devlogs aún.</p>
                )}
            </div>
        </section>
    );
}
