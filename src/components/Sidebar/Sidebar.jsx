import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  return (
    <div>
      <aside className="bg-gray-800 text-white w-64 py-8 px-4 fixed top-0 bottom-0 z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Travel Monk</h2>
        </div>
        <nav>
          {/*-------------------Dashboard section------------------*/}

          <div className="mb-4">
            <Link to="/">
              <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                <span>Dashboard</span>
              </div>
            </Link>
           
           
          </div>

          {/**-----------------------------Users Section---------------*/}
          <div className="mb-4">
            <Link to="get-all-users">  
            <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
              <span>All Users</span>
            </div>
            </Link>
          </div>
           


          {/*---------------------------Packages Section------------------------------------*/}
          <div className="mb-4">
            <div
              onClick={() => setIsPackageOpen(!isPackageOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>Package</span>
              {isPackageOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isPackageOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="#">
                  <li className="hover:text-gray-300 cursor-pointer">
                    Add Package
                  </li>
                </Link>
                <Link to="#">
                  <li className="hover:text-gray-300 cursor-pointer">
                    Add Indian Packages
                  </li>
                </Link>
                <Link to="#">
                  <li className="hover:text-gray-300 cursor-pointer">
                    Add Internation Package
                  </li>
                </Link>
                <Link to="all-packages">
                  <li className="hover:text-gray-300 cursor-pointer">
                    List Packages
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/*------------------------------Patner Section------------------------------*/}
          <div className="mb-4">
            <Link to="get-allpartners">
              <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                <span>Partners</span>
              </div>
            </Link>
            
           
          </div>

          {/*------------------------------Bookings------------------------------------*/}
          {/* <div className="mb-4">
            <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
              <Link to="bookings"><span>Bookings</span></Link> 
            </div>
          </div> */}

          {/*------------------------------Contact-------------------------------------*/}
          <div className="mb-4">
            <div
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>Contacts</span>
              {isContactOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isContactOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="contact">
                  <li className="hover:text-gray-300  cursor-pointer">
                    Contact List
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/*---------------------------Bus Cruise Contact-----------------------------*/}
          <div className="mb-4">
            <div
            
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <Link to="bus-cruise"><span>Bus & Cruise Contacts</span></Link> 
               
            </div>
           
          </div>

          {/*---------------------------Vehicle Section------------------------------------*/}
          <div className="mb-4">
            <div
              onClick={() => setIsVehicleOpen(!isVehicleOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>Vehicles</span>
              {isVehicleOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isVehicleOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="add-vehicle">
                  <li className="hover:text-gray-300 cursor-pointer">
                    Add Vehicle
                  </li>
                </Link>
                <Link to="get-all-vehicles">
                  <li className="hover:text-gray-300 cursor-pointer">
                    All Vehicles
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
