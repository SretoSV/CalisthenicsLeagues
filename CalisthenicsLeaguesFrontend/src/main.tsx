import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/*pages*/
import { LeaguesPage } from './pages/LeaguesPage.tsx';
import { LeagueMembersPage } from './pages/LeagueMembersPage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ApplyPage } from './pages/ApplyPage.tsx';
import { ChatPage } from './pages/ChatPage.tsx';
import { EditProfilePage } from './pages/EditProfilePage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LeaguesPage />
  },
  {
    path: "/LeaguesPage",
    element: <LeaguesPage />
  },
  {
    path: "/LeagueMembersPage",
    element: <LeagueMembersPage />
  },
  {
    path: "/ShopPage",
    element: <ShopPage />
  },
  {
    path: "/ApplyPage/:Name",
    element: <ApplyPage />
  },
  {
    path: "/ChatPage",
    element: <ChatPage />
  },
  {
    path: "/EditProfilePage",
    element: <EditProfilePage />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
