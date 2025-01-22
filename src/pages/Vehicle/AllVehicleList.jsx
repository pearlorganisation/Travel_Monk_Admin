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

const VehicleCard = ({ vehicle }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteVehicle(vehicle._id));
    dispatch(getAllVehicles());
    setDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
  };

  return (
    <div>
      {/* <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-row">
            <Car className="w-10 h-10 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800 pt-2">
              {vehicle?.vehicleName}
            </h2>
          </div>
          <button onClick={handleDelete}>
            <Trash2 />
          </button>
          <Link to={`/update-vehicle/${vehicle?._id}`} state={{vehicleInfo:vehicle}}>
            <button>
              Edit
            </button>
          </Link>
        
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {vehicle.image &&
               <img
                  src={`${baseURL}/${vehicle.image.path}`} // Adjust path if needed
                  alt="Current Logo"
                  className="h-40 w-auto mb-4 rounded-md shadow-md"
              />
            }
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm text-gray-600">Passengers</p>
            <p className="font-bold text-blue-700">
              {vehicle?.passengerCapacity}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Luggage</p>
            <p className="font-bold text-blue-700">
              {vehicle?.luggageCapacity}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-bold text-green-700">${vehicle?.pricePerDay}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              vehicle?.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {vehicle?.isAvailable ? "Available" : "Not Available"}
          </span>
        </div>
      </div> */}
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

const VehicleList = ({ vehicles , totalVehicles}) => {
    return (
        <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">All Vehicles</h1>
        <h1 className="text-2xl font-bold mb-3">Total Vehicles : {totalVehicles}</h1>
            {vehicles.length === 0 ? (
                <div className="text-center text-gray-500">No vehicles available</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {Array.isArray(vehicles) && vehicles?.map(vehicle => (
                        <VehicleCard key={vehicle?._id} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
};

const AllVehicleList = () => {
  const dispatch = useDispatch();
  const { vehiclesInfo, loading, error, paginate } = useSelector(
    (state) => state.vehicles
  );
const [currentPage, setCurrentPage] = useState(1)
const TotalPage = Math.ceil(paginate.total/paginate.limit)

const handlePageChnage=(page)=>{
 if(page>0 && page<= TotalPage){
  setCurrentPage(page)
  }  
}

  useEffect(() => {
    dispatch(getAllVehicles({page:currentPage}));
  }, [dispatch, currentPage]);

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
    
      <VehicleList vehicles={vehiclesInfo} totalVehicles={paginate.total} />
     
      {/** pagination */}
       <Pagination currentPage={currentPage} totalPages={TotalPage} handlePageClick={handlePageChnage} paginate={paginate} />
    </main>
  );
};

export default AllVehicleList;
