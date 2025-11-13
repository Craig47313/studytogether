import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './auth/login/Login';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
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
