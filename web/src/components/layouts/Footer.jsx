export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          
          <img src="favicon.jpeg" alt="Frank is Dreaming Logo" className="h-25 mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">Frank is Dreaming</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            <span className="font-semibold text-cyan-300">Frank is Dreaming</span> es un 
            <span className="italic"> metroidvania psicológico</span> donde los sueños se convierten 
            en pesadillas. Sumérgete en paisajes imposibles, enfrenta miedos convertidos en 
            criaturas y descubre una historia cargada de melancolía y simbolismo. 
            Cada rincón del mundo onírico refleja los recuerdos, dudas y heridas de Frank.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#inicio" className="hover:text-pink-500 transition">Inicio</a></li>
            <li><a href="#features" className="hover:text-pink-500 transition">Características</a></li>
            <li><a href="#characters" className="hover:text-pink-500 transition">Personajes</a></li>
            <li><a href="#subscribe" className="hover:text-pink-500 transition">Suscríbete</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-">Disponible en</h4>
          <div className="flex flex-wrap gap-6 mb-6">
            <img src="/assets/ps5.webp" alt="PlayStation" className="h-20 object-contain" />
            <img src="/assets/xboxOne.webp" alt="Xbox" className="h-20 object-contain" />
            <img src="/assets/steam.webp" alt="Steam" className="h-20 object-contain" />
            <img src="/assets/nintendo.webp" alt="Nintendo" className="h-20 object-contain" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
        © 2025 Frank is Dreaming. Todos los derechos reservados.
      </div>
    </footer>
  );
}
