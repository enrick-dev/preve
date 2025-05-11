import NavbarPages from '@/layouts/NavbarPages';
import App from '@/pages/App';
import NotFound from '@/pages/NotFound';
import Otb from '@/pages/Otb';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    Component: NavbarPages,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/otb',
        element: <Otb />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
