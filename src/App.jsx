import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin';
import VendorLogin from './pages/VendorLogin';
import UserSignup from './pages/UserSignup';
import VendorSignup from './pages/VendorSignup';
import HomePage from './pages/HomePage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/user-login',
      element: <UserLogin />,
    },
    {
      path: '/vendor-login',
      element: <VendorLogin />,
    },
    {
      path: '/user-signup',
      element: <UserSignup />,
    },
    {
      path: '/vendor-signup',
      element: <VendorSignup />,
    },

  ]);

  return <RouterProvider router={router} />

}

export default App
