import { useState } from "react";
import frank from "/assets/char-frank.jpeg";
import rabbit from "/assets/char-rabbit.jpeg";
import fox from "/assets/char-fox.jpeg";

const characters = [
  { 
    img: frank, 
    name: "Frank",
    desc: "El soñador perdido en un mundo extraño, armado solo con su linterna." 
  },
  { 
    img: rabbit, 
    name: "El Guia",
    desc: "Un mago enigmático que juega con ilusiones y acertijos." 
  },
  { 
    img: fox, 
    name: "Jinks",
    desc: "Criatura astuta y mística, de ojos brillantes y naturaleza cambiante." 
  }
];

export default function Characters() {
  const [activeDesc, setActiveDesc] = useState("");

  return (
    <section id="personajes" className="py-28 bg-black text-white text-center">
      <h2 className="text-3xl font-['Cinzel_Decorative'] mb-16 drop-shadow-xl">
        Conoce a los Personajes
      </h2>
      
      {/* Contenedor de personajes */}
      <div className="flex flex-wrap justify-center gap-16">
        {characters.map((char, i) => (
          <div 
            key={i} 
            className="w-80 flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setActiveDesc(char.desc)}
            onMouseLeave={() => setActiveDesc("")}
          >
            <img
              src={char.img}
              alt={char.name}
              className="w-80 h-[28rem] object-cover rounded-2xl filter grayscale hover:grayscale-0 transform hover:scale-105 transition duration-500 shadow-[0_0_40px_rgba(255,255,200,0.2)]"
            />
            <h3 className="mt-6 text-2xl font-semibold tracking-wide">{char.name}</h3>
          </div>
        ))}
      </div>

      {/* Panel de descripción */}
      <div className="mt-14 min-h-[5rem] flex items-center justify-center">
        {activeDesc && (
          <p className="max-w-3xl text-xl text-gray-300 font-['Cormorant_Garamond'] bg-white/5 border border-yellow-200/20 rounded-xl px-6 py-4 backdrop-blur-md shadow-lg transition-all duration-500">
            {activeDesc}
          </p>
        )}
      </div>
    </section>
  );
}
