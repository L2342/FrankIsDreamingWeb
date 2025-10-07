import { Link } from "react-router-dom";

export default function Subscribe() {
  return (
    <section className="relative bg-black flex flex-col items-center overflow-hidden py-24">
      <div className="top-0 left-1/2 transform translate-y-[55px] z-20 pointer-events-none">
        <img
          src="/assets/frank-suscribe.PNG"
          alt="Frank"
          className="w-[900px] max-w-full"
        />
      </div>
      <div
        id="suscribete"
        className="relative z-10 w-full bg-black border-t border-neutral-800 py-24 px-6 md:px-16 text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer">
          Suscríbete a las novedades
        </h2>
        <p className="text-slate-300 mb-12 text-xl max-w-3xl mx-auto leading-relaxed">
          Recibe noticias exclusivas, avances y contenido detrás de cámaras de{" "}
          <span className="font-bold bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Frank is Dreaming
          </span>
          . ¡No te pierdas ni un detalle de esta increíble aventura onírica!
        </p>
        <div className="flex justify-center">
          <Link to="/subscribe">
            <button className="px-10 py-4 bg-pink-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition text-lg">
              Suscribirme
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
