export default function Subscribe() {
  return (
    <section className="relative bg-gray-100 dark:bg-black flex flex-col items-center overflow-hidden">
      <div className=" top-0 left-1/2 transform translate-y-[55px] z-20 pointer-events-none">
        <img
          src="/assets/frank-suscribe.PNG"
          alt="Frank"
          className="w-[900px] max-w-full"
        />
      </div>
 
      <div id="suscribete" className="relative z-10 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-24 px-6 md:px-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Suscríbete a las novedades
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
          Recibe noticias exclusivas, avances y contenido detrás de cámaras de{" "}
          <span className="font-semibold text-pink-500">Frank is Dreaming</span>.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-1 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none text-lg"
          />
          <button
            type="submit"
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition text-lg"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
}
