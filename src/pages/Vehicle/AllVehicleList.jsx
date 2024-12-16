/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVehicle,
  getAllVehicles,
} from "../../features/Actions/Vehicles/vehicleAction";

import { Car, Trash2, X } from "lucide-react"; // Added X icon for closing modal

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
      <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
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
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Array.isArray(vehicle.images) &&
            vehicle?.images?.map((image, index) => (
              <img
                key={image?.public_id}
                src={image?.secure_url}
                alt={`${vehicle?.vehicleName} - Image ${index + 1}`}
                className="rounded-md object-cover w-full h-40"
              />
            ))}
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
            <p className="font-bold text-green-700">${vehicle?.price}</p>
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

const VehicleList = ({ vehicles }) => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Our Vehicles</h1>
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
  const { vehiclesInfo, loading, error } = useSelector(
    (state) => state.vehicles
  );

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

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
      <VehicleList vehicles={vehiclesInfo} />
    </main>
  );
};

export default AllVehicleList;
