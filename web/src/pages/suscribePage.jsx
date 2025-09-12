import { useState } from "react";

export default function SubscribePage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <section
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden font-serif"
      id="newsletter"
    >
      <div className="absolute inset-0 bg-[url('background.jpeg')] bg-cover bg-center" />

      <div className="relative z-10 w-full max-w-3xl bg-black/80 backdrop-blur-md rounded-3xl border border-neutral-800 shadow-[0_0_50px_rgba(14,0,210,0.2)] p-12 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="favicon.jpeg"
            alt="Frank is Dreaming Logo"
            className="h-30 drop-shadow-lg rounded-lg"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent animate-shimmer">
          Únete al sueño
        </h1>

        <p className="text-slate-300 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
          Suscríbete y recibe noticias, avances exclusivos y contenidos únicos de{" "}
          <span className="font-semibold text-cyan-300">Frank is Dreaming</span>.
        </p>

        <form className="space-y-6 text-left">
          <div>
            <label className="block text-slate-200 mb-2">Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-200 mb-2">Apellido</label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-200 mb-2">Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@email.com"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-200 mb-2">Fecha de nacimiento</label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-200 mb-2">País</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="">Selecciona tu país</option>
              <option>Colombia</option>
              <option>México</option>
              <option>España</option>
              <option>Argentina</option>
              <option>Chile</option>
              <option>Otro</option>
            </select>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
              className="w-5 h-5 rounded-md border border-neutral-700 bg-neutral-900 text-cyan-400 focus:ring-cyan-400"
            />
            <label
              htmlFor="consent"
              className="text-slate-300 text-sm leading-relaxed"
            >
              Acepto el procesamiento de mis datos personales y recibir mensajes informativos sobre Frank is Dreaming al correo inscrito.
            </label>
          </div>

          <div className="pt-6 text-center">
            <button
              type="submit"
              disabled={!accepted}
              className={`w-full py-4 rounded-2xl text-lg font-bold transition-all duration-300
                ${
                  accepted
                    ? "bg-indigo-700 text-white shadow-[0_0_20px_rgba(109,40,217,0.6)] hover:bg-indigo-600 hover:shadow-[0_0_30px_rgba(109,40,217,0.9)]"
                    : "bg-neutral-800 text-slate-500 cursor-not-allowed"
                }`}
            >
              Suscribirme
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap");

        .font-serif {
          font-family: "Merriweather", serif;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 5s linear infinite;
        }
      `}</style>
    </section>
  );
}
