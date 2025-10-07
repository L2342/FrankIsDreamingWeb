import Header from '../components/layouts/Header.jsx';
import Footer from '../components/layouts/Footer.jsx';
import Hero from '../components/sections/Hero.jsx';
import Features from '../components/sections/Features.jsx';
import Characters from '../components/sections/Characters.jsx';
import Trailer from '../components/sections/Trailer.jsx';
import Subscribe from '../components/sections/Subscribe.jsx';

export default function Home() {
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
