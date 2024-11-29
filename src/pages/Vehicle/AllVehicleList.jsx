import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVehicles } from '../../features/Actions/Vehicles/vehicleAction'

import { Car } from 'lucide-react';

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
                <Car className="w-10 h-10 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">{vehicle?.vehicleName}</h2>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
                {vehicle?.images?.map((image, index) => (
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
                    <p className="font-bold text-blue-700">{vehicle?.passengerCapacity}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Luggage</p>
                    <p className="font-bold text-blue-700">{vehicle?.luggageCapacity}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-bold text-green-700">${vehicle?.price}</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span
                    className={`px-3 py-1 rounded-full text-xs ${vehicle?.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                >
                    {vehicle?.isAvailable ? 'Available' : 'Not Available'}
                </span>
            </div>
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
                    {vehicles?.map(vehicle => (
                        <VehicleCard key={vehicle?._id} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
};

const AllVehicleList = () => {
    const dispatch = useDispatch();
    const { vehiclesInfo, loading, error } = useSelector((state) => state.vehicles);

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