import { useState } from "react";
import frank from "/assets/char-frank.jpeg";
import rabbit from "/assets/char-rabbit.jpeg";
import fox from "/assets/char-fox.jpeg";

const characters = [
  {
    img: frank,
    name: "Frank",
    desc: "Atrapado en una rutina gris donde las expectativas familiares y las presiones sociales han enterrado su verdadero yo, Frank encuentra refugio en un mundo onírico vibrante donde puede ser quien realmente es."
  },
  {
    img: rabbit,
    name: "El Guia",
    desc: "Una misteriosa entidad onírica que se convierte en el compañero más cercano de Frank durante su travesía por el mundo de los sueños. Conoce todos los secretos del reino onírico y promete mostrarle a Frank maravillas que nunca podría experimentar despierto."
  },
  {
    img: fox,
    name: "Jinks",
    desc: '"Ohh… ¿perdido otra vez? Me encanta cuando los humanos se enredan en sus propios sueños. Jejeje… ¿Quieres un consejo? No sigas la luz… o sí. Yo qué sé, yo lo sé todo y nada al mismo tiempo. Lo único seguro es que yo estaré allí… esperándote en las sombras, riéndome bajito."'
  }
];

export default function Characters() {
  const [activeDesc, setActiveDesc] = useState("");

  return (
    <section id="personajes" className="py-28 bg-black text-white text-center">
      <h2 className="text-3xl font-['Cinzel_Decorative'] mb-16 drop-shadow-xl">
        Voces que habitan el sueño
      </h2>

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

      <div className="mt-14 min-h-[5rem] flex items-center justify-center">
        <div className="max-w-3xl w-full min-h-[7.5rem] flex items-center justify-center">
          {activeDesc && (
            <p className="text-xl text-gray-300 font-['Cormorant_Garamond'] bg-white/5 border border-yellow-200/20 rounded-xl px-6 py-4 backdrop-blur-md shadow-lg transition-all duration-500">
              {activeDesc}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
