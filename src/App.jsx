import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin';
import VendorLogin from './pages/VendorLogin';
import UserSignup from './pages/UserSignup';
import VendorSignup from './pages/VendorSignup';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import About from './pages/About';
import VendorInterface from './pages/VendorInterface';
import PostedAds from './pages/PostedAds';
import VenAdForm from './pages/VendorInterface/components/VenAdForm';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    setIsHomePage(window.location.pathname === '/');
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} isHomePage={isHomePage} />
      <Outlet context={[isLoggedIn, setIsLoggedIn]} />
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
      ],
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
    {
      path: '/adform',
      element: <VenAdForm />,
    },
    {
      path: '/About',
      element: <About />,
    },
    {
      path: '/ven-interface',
      element: <VendorInterface />,
    },
    {
      path: '/postedads',
      element: <PostedAds />,
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
