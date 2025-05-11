import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface PropsNavbar {
  className: string;
}

const Navbar = ({ className }: PropsNavbar) => {
  const links = [
    {
      path: '/',
      title: 'Pagina Inicial',
      active: true,
    },
    {
      path: '/otb',
      title: 'OTB',
      active: true,
    },
    {
      path: '/',
      title: 'Pagina 3',
      active: false,
    },
    {
      path: '/',
      title: 'Pagina 4',
      active: false,
    },
  ];
  return (
    <header
      className={cn(
        'flex-initial flex justify-between bg-primary text-secondary items-center',
        className,
      )}
    >
      <img src="/logo.png" alt="Logo Preve" className="size-16" />
      <div>
        <ul className="flex gap-3">
          {links.map((item) => (
            <li
              className={`${
                !item.active ? 'opacity-70 pointer-events-none' : ''
              }`}
            >
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </header>
  );
};

export default Navbar;
