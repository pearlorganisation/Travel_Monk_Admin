import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Bookings from "./pages/Bookings/Bookings";
import Contact from "./pages/Contacts/Contact";
import Bus_Cruise_Contact from "./pages/Bus_Cruise_Contact/Bus_Cruise_Contact";
import { useSelector } from "react-redux";
import GetAllUsers from "./pages/Users/GetAllUsers";
import GetAllPartners from "./pages/Partner/getAllPartners";
import AllPackage from "./pages/PackageList/AllPackage";
import AddVehicle from "./pages/Vehicle/AddVehicle";
import AllVehicleList from "./pages/Vehicle/AllVehicleList";
import AddPackage from "./pages/AddPackage/AddPackage";
import AddActivity from "./pages/AddActivity/AddActivity";
import GetAllActivites from "./pages/GetActivies/GetActivities";
import EditActivity from "./pages/EditActivity/EditActivity";
import AddDestination from "./pages/AddDestination/AddDestination";

const AppRoutes = () => {
  const { isAdminLoggedIn } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAdminLoggedIn ? <Layout /> : <Login />,
      children: isAdminLoggedIn
        ? [
            { index: true, element: <Dashboard /> },
            { path: "bookings", element: <Bookings /> },
            { path: "contact", element: <Contact /> },
            { path: "bus-cruise", element: <Bus_Cruise_Contact /> },
            { path: "get-all-users", element: <GetAllUsers /> },
            { path: "get-allpartners", element: <GetAllPartners /> },
            { path: "all-packages", element: <AllPackage /> },
            { path: "add-vehicle", element: <AddVehicle /> },
            { path: "add-activity", element: <AddActivity /> },
            { path: "edit-activity/:id", element: <EditActivity /> },
            { path: "get-all-vehicles", element: <AllVehicleList /> },
            { path: "add-package", element: <AddPackage /> },
            { path: "add-destination", element: <AddDestination /> },
            { path: "all-destinations", element: <AllPackage /> },
            { path: "get-all-activities", element: <GetAllActivites /> },
          ]
        : [],
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return <AppRoutes />;
}

export default App;
