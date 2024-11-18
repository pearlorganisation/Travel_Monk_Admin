import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div>
      <aside className="bg-gray-800 text-white w-64 py-8 px-4 fixed top-0 bottom-0 z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Travel Monk</h2>
        </div>
        <nav>
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
                <Link to="#">
                  <li className="hover:text-gray-300 cursor-pointer">
                    List Packages
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/*------------------Coupon Section--------------------------*/}
          <div className="mb-4">
            <div
              onClick={() => setIsCouponOpen(!isCouponOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>Coupons</span>
              {isCouponOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isCouponOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="#">
                  <li className="hover:text-gray-300  cursor-pointer">
                    Add Coupons
                  </li>
                </Link>
                <Link to="#">
                  <li className="hover:text-gray-300  cursor-pointer">
                    List Coupons
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/*------------------------------Patner Section------------------------------*/}
          <div className="mb-4">
            <div
              onClick={() => setIsPartnerOpen(!isPartnerOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>Partners</span>
              {isPartnerOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isPartnerOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="add-partner-type">
                  <li className="hover:text-gray-300  cursor-pointer">
                    Add Partner Type
                  </li>
                </Link>
                <Link to="add-partner">
                  <li className="hover:text-gray-300  cursor-pointer">
                    Add Partner
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/*------------------------------Bookings------------------------------------*/}
          <div className="mb-4">
            <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
              <Link to="bookings"><span>Bookings</span></Link> 
            </div>
          </div>

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
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
