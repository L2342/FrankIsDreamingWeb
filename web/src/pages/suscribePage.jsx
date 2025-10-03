import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
export default function DreamNewsletter() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6LcncN0rAAAAAF5zBo0c6cDrrDiwM6nRukFMudje&hl=es';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateEmail = (emailValue) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailValue);
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!email) {
      setError('Este campo no puede quedarse vacío.');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('locale', 'es');
      formData.append('email_address_check', '');

      await fetch(
        'https://5d30eb87.sibforms.com/serve/MUIFAEeaXgXoF2AJc-achIEUiWwJHPlps57ZpBhNkoDU5_qK5xb3MqPaTKwWG1ie5WGhGlBPf2mKH10sK1k4nvJ1ibdJMkSTE5UusFLSnFg-4uf0l7m7oI6dyqAlztJ9h693Zm94LCnu56V4mxdrnyah1_PXBvZdBGK5r7e0TxQvWoh3Q9RS9ViJw61FhvSm8J33e3lPYLWVkvG2',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }
      );

      setStep(3);
    } catch (error) {
      console.error('Error:', error);
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center">
      <div 
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.PNG)',
          backgroundSize: 'cover',
          backgroundColor: '#0a0a1a'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-4 lg:px-8 flex justify-end items-center min-h-screen">
        <div className="w-full max-w-xl lg:mr-12 xl:mr-24">
          <div className="relative bg-slate-900/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-500/30 p-8 lg:p-12">
            {step === 1 && (
              <div className="text-center space-y-6 animate-fade-in">
                <div className="text-7xl mb-4">🌙</div>
                <h1 className="text-4xl lg:text-5xl text-purple-100 mb-4 leading-tight" style={{ fontFamily: "'Henny Penny', cursive" }}>
                  Adéntrate en el Sueño
                </h1>
                <p className="text-base lg:text-lg text-purple-100/90 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  El mundo de <span className="italic">Frank Is Dreaming</span> guarda mensajes que no todos pueden ver.
                </p>
                <p className="text-base lg:text-lg text-purple-100/90 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Suscríbete y recibe señales, visiones anticipadas y fragmentos que no encontrarás en ningún otro lugar.
                </p>
                <div className="flex flex-col gap-4 justify-center mt-8 pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold text-base lg:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 uppercase tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Cruzar el Umbral
                  </button>
                  <Link to="/"> 
                    <button
                      className="bg-transparent hover:bg-purple-900/30 text-purple-200 px-8 py-4 rounded-full font-bold text-base lg:text-lg transition-all border-2 border-purple-400/50 hover:border-purple-300 uppercase tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Aún no estoy listo
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="text-center space-y-6 animate-fade-in">
                <button
                  onClick={() => setStep(1)}
                  className="absolute top-4 left-4 text-purple-300 hover:text-purple-100 transition-all p-2 rounded-full hover:bg-purple-500/20"
                  title="Volver"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div className="text-7xl mb-4">🌌</div>
                <h1 className="text-4xl lg:text-5xl text-purple-100 mb-4 leading-tight" style={{ fontFamily: "'Henny Penny', cursive" }}>
                  Deja tu huella en el Sueño
                </h1>
                <p className="text-base lg:text-lg text-purple-100/90 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Solo quienes comparten su dirección podrán recibir los susurros del otro lado. Escribe tu correo… y mantente conectado con lo que se oculta entre la vigilia y el sueño.
                </p>
                <div className="mt-8 space-y-6 pt-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="Tu email"
                      className="w-full px-6 py-4 rounded-full bg-slate-800/60 border-2 border-purple-400/40 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-base lg:text-lg transition-all"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    />
                    {error && (
                      <div className="mt-3 text-red-400 text-sm text-left px-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {error}
                      </div>
                    )}
                    <div className="text-xs text-purple-300/50 mt-3 text-left px-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Introduce tu dirección de e-mail para suscribirte. Ej.: abc@xyz.com
                    </div>
                  </div>
                  <div className="g-recaptcha-v3" data-sitekey="6LcncN0rAAAAAF5zBo0c6cDrrDiwM6nRukFMudje" style={{ display: 'none' }}></div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold text-base lg:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Continuar el Viaje'
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6 animate-fade-in">
                <div className="text-7xl mb-4">⭐</div>
                <h1 className="text-4xl lg:text-5xl text-purple-100 mb-4 leading-tight" style={{ fontFamily: "'Henny Penny', cursive" }}>
                  El Sueño te ha aceptado
                </h1>
                <p className="text-base lg:text-lg text-purple-100/90 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Revisa tu bandeja de entrada. La primera señal ya está en camino.
                </p>
                <p className="text-base lg:text-lg text-purple-100/90 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  A partir de ahora, las puertas del mundo onírico permanecerán abiertas para ti.
                </p>
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => {
                      setStep(1);
                      setEmail('');
                      setError('');
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold text-base lg:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 uppercase tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Regresar al Portal
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <h2 className="text-xl lg:text-2xl text-purple-300/60" style={{ fontFamily: "'Henny Penny', cursive" }}>
              Frank Is Dreaming
            </h2>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Henny+Penny&family=Playfair+Display:wght@400;700&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}