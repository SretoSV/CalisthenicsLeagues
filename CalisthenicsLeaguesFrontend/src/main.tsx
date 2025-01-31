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
import { LoginPage } from './pages/LoginPage.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { CartProvider } from './context/CartContext.tsx';

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
  {
    path: "/LoginPage",
    element: <LoginPage />
  },
  {
    path: "/EditPage",
    element: <EditProfilePage />
  },
]);

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </UserProvider>,
)
