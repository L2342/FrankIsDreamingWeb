import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
   
    
export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <ParallaxBanner style={{ aspectRatio: "2 / 1" }} className="h-full">

                {/* Capa 1: Fondo cielo */}
                <ParallaxBannerLayer image="/assets/cielo.PNG" speed={-60} />
                <ParallaxBannerLayer image="/assets/titulo.PNG" speed={14} className="z-11 scale-70" />

                {/* Capa 2: Reloj fondo */}
                <ParallaxBannerLayer image="/assets/relojfondo1.PNG" speed={-30} />

                {/* Capa 3: Carta As */}
                <ParallaxBannerLayer image="/assets/cartaAs.PNG" speed={-10} className="z-10" />

                {/* Capa 4: Carta azul 1 */}
                <ParallaxBannerLayer image="/assets/cartaazul1.PNG" speed={-20} className="opacity-75" />

                {/* Capa 5: Carta 10 Corazones */}
                <ParallaxBannerLayer image="/assets/carta10.PNG" speed={-8} className="z-10" />

                {/* Capa 6: Mariposa */}
                <ParallaxBannerLayer image="/assets/mariposa.PNG" speed={-22} className="opacity-50" />

                {/* Capa 7: Molino */}
                <ParallaxBannerLayer image="/assets/molino.PNG" speed={-10} className="opacity-50" />

                {/* Capa 8: Frank */}
                <ParallaxBannerLayer image="/assets/frank.PNG" speed={-15} className="scale-80" />

                {/* Capa 9: Carta azul 2 */}
                <ParallaxBannerLayer image="/assets/cartaazul2.PNG" speed={-25} className="opacity-50" />

                {/* Capa 10: Reloj 2 */}
                <ParallaxBannerLayer image="/assets/relojfondo2.PNG" speed={-15} className="opacity-50" />

                {/* Capa 11: Carta Rey */}
                <ParallaxBannerLayer image="/assets/cartaRey.PNG" speed={-8} />

                {/* Capa 12: Nubes foreground */}
                <ParallaxBannerLayer image="/assets/nubes.PNG" speed={20} className="z-20" style={{
                    transform: 'scaleX(0.8) scaleY(2.5)' // Más estrecho, más alto
                }} />
                <ParallaxBannerLayer speed={0}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </section>
    );
}
