import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { ModeToggleTheme } from './mode-toggle-theme';

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
      path: '/pag3',
      title: 'Pagina 3',
      active: false,
    },
    {
      path: '/pag4',
      title: 'Pagina 4',
      active: false,
    },
  ];
  return (
    <header
      className={cn(
        ' dark:bg-foreground/60 lex-initial flex justify-between bg-foreground text-secondary items-center border-b px-8 mt-2 mx-2 rounded-full max-md:px-2 max-md:pr-4 pr-6',
        className,
      )}
    >
      <img src="/logo.png" alt="Logo Preve" className="size-14" />
      <div>
        <ul className="flex gap-3 max-md:hidden">
          {links.map((item) => (
            <li
              className={`${
                !item.active ? 'opacity-70 pointer-events-none' : ''
              }`}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? ' transition-all text-primary dark:text-secondary-foreground'
                    : ''
                }
                to={item.path}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ModeToggleTheme />
      </div>
    </header>
  );
};

export default Navbar;
