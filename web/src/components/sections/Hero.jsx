import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    useEffect(() => {
        const heroElement = heroRef.current;

        const handleMouseMove = (e) => {
            if (heroElement) {
                const rect = heroElement.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                setMousePosition({ x, y });
            }
        };

        const handleMouseLeave = () => {
            setMousePosition({ x: 0, y: 0 });
        };

        if (heroElement) {
            heroElement.addEventListener("mousemove", handleMouseMove);
            heroElement.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                heroElement.removeEventListener("mousemove", handleMouseMove);
                heroElement.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full h-screen overflow-hidden cursor-none"
            id="inicio"
        >
            <ParallaxBanner style={{ aspectRatio: "2 / 1" }} className="h-full">

                {/* Capa 1: Fondo cielo */}
                <ParallaxBannerLayer
                    image="/assets/cielo.PNG"
                    speed={-60}
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/cielo.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.3 * 20}px, ${mousePosition.y * 0.3 * 15}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                <ParallaxBannerLayer
                    speed={14}
                    className="z-11"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center scale-70"
                        style={{
                            backgroundImage: 'url(/assets/titulo.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.8 * 40}px, ${mousePosition.y * 0.8 * 25}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 2: Reloj fondo */}
                <ParallaxBannerLayer
                    speed={-30}
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/relojfondo1.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.5 * 25}px, ${mousePosition.y * 0.5 * 20}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 3: Carta As */}
                <ParallaxBannerLayer
                    speed={-10}
                    className="z-10"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/cartaAs.PNG)',
                            transform: `translate3d(${mousePosition.x * 1.2 * 60}px, ${mousePosition.y * 1.2 * 35}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 4: Carta azul 1 */}
                <ParallaxBannerLayer
                    speed={-20}
                    className="opacity-75"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/cartaazul1.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.7 * 35}px, ${mousePosition.y * 0.7 * 22}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 5: Carta 10 Corazones */}
                <ParallaxBannerLayer
                    speed={-8}
                    className="z-10"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/carta10.PNG)',
                            transform: `translate3d(${mousePosition.x * 1.1 * 55}px, ${mousePosition.y * 1.1 * 33}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 6: Mariposa */}
                <ParallaxBannerLayer
                    speed={-22}
                    className="opacity-50"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/mariposa.PNG)',
                            transform: `translate3d(${mousePosition.x * 1.5 * 75}px, ${mousePosition.y * 1.5 * 45}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 7: Molino */}
                <ParallaxBannerLayer
                    speed={-10}
                    className="opacity-50"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/molino.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.4 * 20}px, ${mousePosition.y * 0.4 * 15}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 8: Frank */}
                <ParallaxBannerLayer
                    speed={-15}
                    className="scale-80"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/frank.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.9 * 45}px, ${mousePosition.y * 0.9 * 27}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 9: Carta azul 2 */}
                <ParallaxBannerLayer
                    speed={-25}
                    className="opacity-50"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/cartaazul2.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.8 * 40}px, ${mousePosition.y * 0.8 * 25}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 10: Reloj 2 */}
                <ParallaxBannerLayer
                    speed={-15}
                    className="opacity-50"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/relojfondo2.PNG)',
                            transform: `translate3d(${mousePosition.x * 0.6 * 30}px, ${mousePosition.y * 0.6 * 20}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 11: Carta Rey */}
                <ParallaxBannerLayer
                    speed={-8}
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/cartaRey.PNG)',
                            transform: `translate3d(${mousePosition.x * 1.3 * 65}px, ${mousePosition.y * 1.3 * 38}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                {/* Capa 12: Nubes foreground */}
                <ParallaxBannerLayer
                    speed={20}
                    className="z-20"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/nubes.PNG)',
                            transform: `scaleX(1.0) scaleY(1.0) translateY(15px) translate3d(${mousePosition.x * 0.2 * 10}px, ${mousePosition.y * 0.2 * 8}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </ParallaxBannerLayer>

                <ParallaxBannerLayer speed={0}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                        {/* Contenido adicional aquí si es necesario */}
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </section>
    );
}