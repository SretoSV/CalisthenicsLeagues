import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
/*pages*/
import { LeaguesPage } from './pages/LeaguesPage.tsx';
import { LeagueMembersPage } from './pages/LeagueMembersPage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ApplyPage } from './pages/ApplyPage.tsx';
import { ChatPage } from './pages/ChatPage.tsx';
import { EditProfilePage } from './pages/EditProfilePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
/*contexts*/
import { UserProvider } from './context/UserContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { CountriesProvider } from './context/CountriesContext.tsx';

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
    path: "/ChatPage/:Chat",
    element: <ChatPage />
  },
  {
    path: "/EditProfilePage",
    element: <EditProfilePage />
  },
  {
    path: "/LoginPage",
    element: <LoginPage />
  },
  {
    path: "/EditPage",
    element: <EditProfilePage />
  },
  {
    path: "/AdminPage",
    element: <AdminPage />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  },
]);

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <CartProvider>
      <CountriesProvider>
        <RouterProvider router={router} />
      </CountriesProvider>
    </CartProvider>
  </UserProvider>,
)
