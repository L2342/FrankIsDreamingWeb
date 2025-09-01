export default function Header() {
  return (
    <header className="fixed w-full bg-transparent bg-opacity-70 text-white flex justify-between items-center px-8 py-4 z-50">
      <h1 className="text-2xl font-bold">Frank is Dreaming</h1>
      <nav className="space-x-6 text-lg">
        <a href="#inicio" className="hover:text-purple-400">Inicio</a>
        <a href="#features" className="hover:text-purple-400">Features</a>
        <a href="#personajes" className="hover:text-purple-400">Personajes</a>
        <a href="#trailer" className="hover:text-purple-400">Tráiler</a>
        <a href="#descarga" className="hover:text-purple-400">Descárgalo</a>
      </nav>
    </header>
  );
}