import { Link } from 'react-router-dom';

const Header = () => (
  <header className="flex-initial flex justify-between bg-primary text-secondary items-center">
    <img src="/logo.png" alt="Logo Preve" className="size-16" />
    <div>
      <ul className="flex gap-3">
        <li>
          <Link to="/">Pagina Inicial</Link>
        </li>
        <li className="opacity-70 pointer-events-none">
          <Link to="#">Pagina 2</Link>
        </li>
        <li className="opacity-70 pointer-events-none">
          <Link to="#">Pagina 3</Link>
        </li>
        <li className="opacity-70 pointer-events-none">
          <Link to="#">Pagina 4</Link>
        </li>
      </ul>
    </div>
    <div></div>
  </header>
);
const Body = () => {
  return <body className="flex-1"></body>;
};
function App() {
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <Header />
      <Body />
    </div>
  );
}

export default App;
