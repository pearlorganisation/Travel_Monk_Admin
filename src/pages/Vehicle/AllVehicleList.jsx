/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVehicle,
  getAllVehicles,
} from "../../features/Actions/Vehicles/vehicleAction";

import { Car, Trash2, X } from "lucide-react"; // Added X icon for closing modal
import { Link } from "react-router-dom";
import { baseURL } from "../../services/axiosInterceptor";
import Pagination from "../../components/Pagination/Pagination";

const VehicleCard = ({ vehicle,currentPage, sortBy, search }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteVehicle(vehicle._id));
    dispatch(getAllVehicles({ page: currentPage, sortBy: sortBy, search: search }));
    setDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
  };

  return (
    <div>
      <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4">
        {vehicle.image && (
          <img
            src={`${baseURL}/${vehicle.image.path}`} // Adjust path if needed
            alt="Vehicle Image"
            className="h-40 w-40 rounded-md shadow-md object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <Car className="w-10 h-10 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">{vehicle?.vehicleName}</h2>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
                <Trash2 />
              </button>
              <Link to={`/update-vehicle/${vehicle?._id}`} state={{ vehicleInfo: vehicle }}>
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="font-bold text-blue-700">{vehicle?.passengerCapacity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Luggage</p>
              <p className="font-bold text-blue-700">{vehicle?.luggageCapacity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price (INR)</p>
              <p className="font-bold text-green-700">{vehicle?.pricePerDay}</p>
            </div>
          </div>

          <div className="mt-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${vehicle?.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                }`}
            >
              {vehicle?.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Delete Vehicle</h2>
              <button
                onClick={cancelDelete}
                className="text-gray-600 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete {vehicle?.vehicleName}?
            </p>
            <div className="flex justify-end">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VehicleList = ({ vehicles, totalVehicles, currentPage, sortBy, search }) => {
    return (
        <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">All Vehicles</h1>
        <h1 className="text-2xl font-bold mb-3">Total Vehicles : {totalVehicles}</h1>
            {vehicles.length === 0 ? (
                <div className="text-center text-gray-500">No vehicles available</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {Array.isArray(vehicles) && vehicles?.map(vehicle => (
                        <VehicleCard key={vehicle?._id} vehicle={vehicle} currentPage={currentPage} sortBy={sortBy} search={search} />
                    ))}
                </div>
            )}
        </div>
    );
};

const AllVehicleList = () => {
  const priceSort =[
    {
      id:1,
      sortBy:"price-asc"
    },
    {
      id: 2,
      sortBy: "price-desc"
    }
  ]


  const dispatch = useDispatch();
  const { vehiclesInfo, loading, error, paginate } = useSelector(
    (state) => state.vehicles
  );
const [currentPage, setCurrentPage] = useState(1)
const TotalPage = Math.ceil(paginate.total/paginate.limit)
const [selectedType, setSelectedType] = useState("")
const [searchQuery, setSearchQuery] = useState("")

const handleSearchChange =(el)=>{
  setSearchQuery(el)
}
 
const handlePageChnage=(page)=>{
 if(page>0 && page<= TotalPage){
  setCurrentPage(page)
  }  
}

  useEffect(() => {
    dispatch(getAllVehicles({page:currentPage, sortBy: selectedType, search: searchQuery}));
  }, [dispatch, currentPage, selectedType, searchQuery]);

  if (loading) {
    return (
      <main className="flex-1 p-8 mt-16 ml-64">
        <div className="text-center text-gray-500">Loading vehicles...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-8 mt-16 ml-64">
        <div className="text-center text-red-500">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="mt-16 flex flex-row gap-2">
        <div>
          <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700">
            Filter by Price
          </label>
          <select
            id="typeFilter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Price</option>
            {priceSort.map((filter) => (
              <option key={filter.id} value={filter.sortBy}>
                {filter.sortBy}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Search By Vehicle Name</label>
          <div>
            <input
              type="text"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      <VehicleList vehicles={vehiclesInfo} totalVehicles={paginate.total} currentPage={currentPage} sortBy={selectedType} search={searchQuery} />
     
      {/** pagination */}
       <Pagination currentPage={currentPage} totalPages={TotalPage} handlePageClick={handlePageChnage} paginate={paginate} />
    </main>
  );
};

export default AllVehicleList;
