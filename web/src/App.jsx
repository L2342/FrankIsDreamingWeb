import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Features from './sections/Features.jsx';
import Characters from './sections/Characters.jsx';
import Trailer from './sections/Trailer.jsx';
import Subscribe from './sections/Subscribe.jsx';
import SubscribeForm from './sections/SubscribeForm.jsx';

export default function App() {
  return (
    <div className="font-sans text-white bg-gray-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <Characters />
        <Trailer />
        <Subscribe />
        
      </main>
      <Footer />
    </div>
  );
}