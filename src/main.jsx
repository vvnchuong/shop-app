import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/register/index.jsx';
import Login from './pages/login/index.jsx';
import { store } from "./redux/store";
import { Provider } from 'react-redux';
import Admin from './pages/admin/index.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminPage from './pages/admin/index.jsx';
import Error403 from './pages/errors/Error403.jsx';
import UserAdminPage from './pages/admin/user/UserTable.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute element={<AdminPage />} allowedRoles={["ADMIN"]} />
    ),
    children: [
      { path: "users", element: <UserAdminPage />}
    ]
  },

  {
    path: "/403",
    element: <Error403 />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
