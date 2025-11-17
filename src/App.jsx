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
