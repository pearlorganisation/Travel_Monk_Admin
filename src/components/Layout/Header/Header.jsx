import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { adminLogout } from "../../../features/Actions/authAction";

const Header = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(adminLogout());
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-lg">
            {/* Logo */}
            <div className="text-xl font-bold">Travel Monk</div>

            {/* Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={handleOpen}
                    className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <span>Profile</span>
                </button>
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 w-40"
                    >
                        <Link
                            to={`profile`}
                            className="block px-4 py-2 hover:bg-gray-100 transition"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
