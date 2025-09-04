import React from "react";
import { motion } from "framer-motion";

// Importa Google Fonts en tu index.html o layout principal:
// 

import feature1 from "/assets/feature1.jpg";
import feature2 from "/assets/feature2.jpeg";
import feature3 from "/assets/feature3.jpg";

const features = [
  {
    img: feature1,
    title: "Personajes Enigmáticos",
    desc: "Conoce a curiosos aliados y a extraños enemigos que parecen salidos de un cuento retorcido. Nada es lo que parece, y cada encuentro cambiará tu viaje."
  },
  {
    img: feature2,
    title: "Mundos Oníricos",
    desc: "Escenarios surrealistas que cambian sutilmente, donde las reglas no siempre son lógicas. Observa, interpreta y deja que la atmósfera te guíe."
  },
  {
    img: feature3,
    title: "Enfrenta tus Miedos, Descifra Pistas",
    desc: "Personajes ambiguos, objetos con significado y decisiones que te llevan a revelar qué mantiene a Frank atrapado en sus sueños."
  }
];

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden"  id="features" style={{
      backgroundColor: "#090157",
      background: "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(4, 17, 112, 1) 100%)"
    }}>

 
      <div className="absolute inset-0 opacity-20 bg-[url('/assets/pattern-dark.png')] mix-blend-overlay"></div>


      <div className="absolute -top-20 -left-20 w-[32rem] h-[32rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] bg-pink-400/10 rounded-full blur-[120px] animate-pulse"></div>

      <h2 className="text-center text-6xl font-['Cinzel_Decorative'] font-bold text-yellow-100 mb-28 tracking-widest drop-shadow-2xl">
        Sumérgete en un sueño profundo
      </h2>

      <div className="max-w-4xl mx-auto px-6 mb-28">
        <p className="text-center text-2xl font-['Cormorant_Garamond'] text-gray-200 leading-relaxed">
          Explora recuerdos, resuelve símbolos y descubre qué mantiene a Frank flotando entre la luz y la penumbra.
          Un viaje melancólico con arte ilustrado y música envolvente.
        </p>
      </div>

      <div className="container mx-auto px-10 space-y-40 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 gap-20 items-center ${index % 2 !== 0 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Imagen más grande con aura */}
            <div className="relative flex justify-center">

              <div className="absolute inset-0 bg-gradient-radial from-yellow-300/20 via-transparent to-transparent rounded-3xl blur-2xl"></div>
              <img
                src={feature.img}
                alt={feature.title}
                className="rounded-3xl shadow-[0_0_80px_rgba(255,255,200,0.25)] border-4 border-white/10 max-w-2xl w-full object-cover transform hover:scale-105 hover:rotate-1 transition duration-700 ease-out"
              />
            </div>

            {/* Texto */}
            <div className="relative bg-white/5 backdrop-blur-xl p-14 rounded-3xl shadow-2xl border border-white/10">
              <div className="absolute -top-7 left-7 text-yellow-300/40 text-6xl select-none font-['Cinzel_Decorative']">
                ✦
              </div>
              <h3 className="text-4xl font-['Cinzel_Decorative'] text-yellow-200 mb-6 drop-shadow-xl tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xl font-['Cormorant_Garamond'] text-gray-200 leading-relaxed">
                {feature.desc}
              </p>
              <div className="absolute -bottom-7 right-7 text-yellow-300/40 text-5xl select-none font-['Cinzel_Decorative']">
                ✦
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
