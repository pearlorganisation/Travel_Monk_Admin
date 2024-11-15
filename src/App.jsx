import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SideBar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login />
  },
  {
    path:"/dashboard",
    element: <Layout />,
    children:[
      {
        index: true,
        element: <Dashboard />
      }
    ]
  }
])


function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>  
 );
}

export default App;
