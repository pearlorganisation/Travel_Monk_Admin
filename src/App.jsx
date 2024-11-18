import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddPartnerType from "./pages/Partner/AddPartnerType";
import AddPartner from "./pages/Partner/AddPartner";
import Bookings from "./pages/Bookings/Bookings";
import Contact from "./pages/Contacts/Contact";
import Bus_Cruise_Contact from "./pages/Bus_Cruise_Contact/Bus_Cruise_Contact";

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
      },
      {
        path:"bookings",
        element: <Bookings />
      },
      {
        path:"contact",
        element:<Contact />
      },
      {
        path:"bus-cruise",
        element:<Bus_Cruise_Contact />
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
