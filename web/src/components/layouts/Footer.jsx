export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Logo + Descripción */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Frank is Dreaming</h3>
          <p className="text-sm leading-relaxed">
            Un metroidvania onírico con arte cálido y melancólico.
            Explora, sueña y despierta en un mundo lleno de misterio.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-white font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" className="hover:text-pink-500 transition">Características</a></li>
            <li><a href="#subscribe" className="hover:text-pink-500 transition">Suscríbete</a></li>
            <li><a href="#gallery" className="hover:text-pink-500 transition">Galería</a></li>
            <li><a href="#contact" className="hover:text-pink-500 transition">Contacto</a></li>
          </ul>
        </div>

        {/* Plataformas + Redes */}
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

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
        © 2025 Frank is Dreaming. Todos los derechos reservados.
      </div>
    </footer>
  );
}
