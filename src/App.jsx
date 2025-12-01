import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './auth/login/Login';
import Home from './homepage/Home';
import Root from './global/root/Root'
import CreateSeshForm from './sesh/createSeshForm/CreateSeshForm';
import BrowsePage from './sesh/browse/BrowsePage/BrowsePage';
import MySessions from './sesh/MySessions/MySessions';
import SessionPreview from './sesh/browse/SessionPreview/SessionPreview';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/create",
        element: <CreateSeshForm/>
      },
      {
        path: "/browse",
        element: <BrowsePage/>
      },
      {
        path: "/mysessions",
        element: <MySessions/>
      },
      {
        path: "/preview/:id",
        element: <SessionPreview/>
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App
