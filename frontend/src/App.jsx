import Login from "./page/Login";
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from "./page/Signup";
import Email from "./page/Email";
import Productpage from "./page/Productpage";
import Dashboard from "./page/admin/Dashboard";


export default function App() {
  const router =createBrowserRouter([
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/signup",
    element:<Signup></Signup>
  },
  {
    path:"/verify",
    element:<Email></Email>
  },
  {
    path:"/productpage",
    element:<Productpage></Productpage>
  },{
    path:"admin/dashboard",
    element:<Dashboard></Dashboard>
  }
])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}