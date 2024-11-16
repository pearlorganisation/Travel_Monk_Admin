import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
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

          {/* Blogs Section */}
          {/* <div className="mb-1">
            <div
              onClick={() => setIsBlogsOpen(!isBlogsOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span>Blogs</span>
              {isBlogsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isBlogsOpen && (
              <ul className="mt-2 ml-4 space-y-2">
               
                <Link to="create-blogCat">
                  <li className="text-gray-300  hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span>Create Blog Category</span>
                    </div>
                  </li>
                </Link>
                <Link to="blogCategories">
                  <li className="text-gray-300  hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span> List Blog Categories</span>
                    </div>
                  </li>
                </Link>
                <Link to="create-blogs">
                  <li className="text-gray-300  hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span> Create Blogs </span>
                    </div>
                  </li>
                </Link>
                <Link to="blogs">
                  <li className="text-gray-300  hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span> List Blogs </span>
                    </div>
                  </li>
                </Link>
              </ul>
            )}
          </div> */}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
