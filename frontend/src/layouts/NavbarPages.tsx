import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const NavbarPages = () => {
  return (
    <div className="flex flex-col h-dvh w-dvw">
      <Navbar className="flex-initial" />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default NavbarPages;
