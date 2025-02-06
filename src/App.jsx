import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Bookings from "./pages/Bookings/Bookings";
import Contact from "./pages/Contacts/Contact";
import Bus_Cruise_Contact from "./pages/Bus_Cruise_Contact/Bus_Cruise_Contact";
import { useSelector } from "react-redux";
import GetAllUsers from "./pages/Users/GetAllUsers";
import GetAllPartners from "./pages/Partner/GetAllPartners";
import AllPackage from "./pages/PackageList/AllPackage";
import AddVehicle from "./pages/Vehicle/AddVehicle";
import AllVehicleList from "./pages/Vehicle/AllVehicleList";
import AddPackage from "./pages/AddPackage/AddPackage";
import AddActivity from "./pages/AddActivity/AddActivity";
import GetAllActivites from "./pages/GetActivies/GetActivities";
import EditActivity from "./pages/EditActivity/EditActivity";
import AddDestination from "./pages/AddDestination/AddDestination";
import AddHotel from "./pages/AddHotel/AddHotel";
import PreBuiltCustomisationEnquiries from "./pages/CustomizationEnquiries/PreBuiltCustomisationEnquiries";
import FullyCustomizedEnquiries from "./pages/CustomizationEnquiries/FullyCustomizedEnquiries";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import AddLocation from "./pages/AddLocation/AddLocation";
import UpdatePackage from "./pages/AddPackage/UpdatePackage";
import UpdatePartner from "./pages/Partner/UpdatePartner";
import UpdateVehicles from "./pages/Vehicle/UpdateVehicle";
import AllHotels from "./pages/AddHotel/AllHotels";
import UpdateHotel from "./pages/AddHotel/UpdateHotel";
import AllDestinations from "./pages/AllDestinations/AllDestinations";
import EditDestination from "./pages/EditDestination/EditDestination";
import AllLocation from "./pages/AddLocation/AllLocation";
import HotelContact from "./pages/HotelContacts/HotelContact";
import UpdateLocation from "./pages/AddLocation/UpdateLocation";
import CustomPackage from "./pages/CustomPackage/CustomPackage";
import AddUser from "./pages/AddUser/AddUser";
import GetAllCustomPackage from "./pages/CustomPackage/GetAllCustomPackage";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/Password/ChangePassword";
import UpdatePrebuiltPackageEnquiries from "./pages/CustomizationEnquiries/UpdatePrebuiltPackageEnquiries";

const AppRoutes = () => {
  const { isAdminLoggedIn } = useSelector((state) => state.auth);
  console.log(isAdminLoggedIn, "isAdminLoggedIn");

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAdminLoggedIn ? <Layout /> : <Login />,
      children: [
        // { index: true, element: <Dashboard /> },
        { index: true, element: <GetAllUsers /> },
        { path: "/profile", element: <Profile /> },
        { path: "/bookings", element: <Bookings /> },
        { path: "/contact", element: <Contact /> },
        { path: "/bus-cruise", element: <Bus_Cruise_Contact /> },

        { path: "/get-allpartners", element: <GetAllPartners /> },
        { path: "/all-packages", element: <AllPackage /> },
        { path: "/add-vehicle", element: <AddVehicle /> },
        { path: "/get-all-vehicles", element: <AllVehicleList /> },
        { path: "/add-package", element: <AddPackage /> },
        { path: "/add-hotel", element: <AddHotel /> },
        {
          path: "/customized-enquiries",
          element: <PreBuiltCustomisationEnquiries />,
        },
        {
          path: "/full-customized-enquiries",
          element: <FullyCustomizedEnquiries />,
        },
        { path: "/add-activity", element: <AddActivity /> },
        { path: "/get-all-activities", element: <GetAllActivites /> },
        { path: "/get-all-destinations", element: <AllDestinations /> },
        { path: "/edit-destination/:id", element: <EditDestination /> },
        { path: "/edit-activity/:id", element: <EditActivity /> },
        { path: "/add-destination", element: <AddDestination /> },
        { path: "/add-location", element: <AddLocation /> },
        { path: "/update-package/:id", element: <UpdatePackage /> },
        { path: "/update-partner/:id", element: <UpdatePartner /> },
        { path: "/update-vehicle/:id", element: <UpdateVehicles /> },
        { path: "/hotels", element: <AllHotels /> },
        { path: "/update-hotel/:id", element: <UpdateHotel /> },
        { path: "/all-locations", element: <AllLocation /> },
        { path: "/hotel-contact", element: <HotelContact /> },
        { path: "/update-location/:id", element: <UpdateLocation /> },
        { path: "/custom-package", element: <CustomPackage /> },
        { path: "/add-user", element: <AddUser /> },
        {
          path: "/get-all-custom-package",
          element: <GetAllCustomPackage />,
        },
        { path: "/change-password", element: <ChangePassword /> },
        { path:"//update-enquiries/:id", element:<UpdatePrebuiltPackageEnquiries />}
      ],
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return <AppRoutes />;
}

export default App;
