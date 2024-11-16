import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddPartnerType from "./pages/Partner/AddPartnerType";
import AddPartner from "./pages/Partner/AddPartner";

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
      },
      {
        path:"add-partner-type",
        element: <AddPartnerType />
      },
      {
        path:"add-partner",
        element: <AddPartner />
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
