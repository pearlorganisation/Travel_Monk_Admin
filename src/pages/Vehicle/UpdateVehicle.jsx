import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getDestinations } from '../../features/Actions/Destination/destinationAction'
import { baseURL } from '../../services/axiosInterceptor'
import { UpdateVehicle } from '../../features/Actions/Vehicles/vehicleAction'

const UpdateVehicles = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const { destinationInfo } = useSelector((state) => state.destinations);
    const { vehicleInfo } = location.state ?? {}
    const { register, handleSubmit, formState:{errors} } = useForm({
        defaultValues:{
            image:`${baseURL}/${vehicleInfo.image.path}`,
            vehicleName: vehicleInfo.vehicleName,
            passengerCapacity:vehicleInfo.passengerCapacity,
            luggageCapacity: vehicleInfo.luggageCapacity,
            pricePerDay:vehicleInfo.pricePerDay,
            destinations: vehicleInfo.destinations[0],
        }
    })
    console.log("the vehicle info is", vehicleInfo)
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const SubmitForm=(data)=>{
         const formData = {...data,image:image, id:id}
         dispatch(UpdateVehicle(formData))
    }

    
        useEffect(()=>{
            dispatch(getDestinations())
        },[dispatch]);
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>UpdateVehicle</div>
          <form onSubmit={handleSubmit(SubmitForm)}>
              {/* Vehicle Name */}
              <div className="mb-4">
                  <label htmlFor="vehicleName" className="block text-sm font-medium text-gray-700">
                      Add Vehicle Name
                  </label>
                  <input
                      type="text"
                      id="vehicleName"
                      {...register("vehicleName", { required: "vehicle name is required" })}
                      className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.vehicleName ? "border-red-500" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.vehicleName && <p className="text-red-500 text-sm mt-1">{errors.vehicleName.message}</p>}
              </div>
              {/** passenger capacity */}
              <div className="mb-4">
                  <label htmlFor="passengerCapacity" className="block text-sm font-medium text-gray-700">
                      Add Passenger Capacity
                  </label>
                  <input
                      type="number"
                      id="passengerCapacity"
                      {...register("passengerCapacity", { required: "Passenger Capacity is required" })}
                      className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.passengerCapacity ? "border-red-500" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.passengerCapacity && <p className="text-red-500 text-sm mt-1">{errors.passengerCapacity.message}</p>}
              </div>

              {/**  luggage capacity*/}
              <div className="mb-4">
                  <label htmlFor="luggageCapacity" className="block text-sm font-medium text-gray-700">
                      Add Luggage Capacity
                  </label>
                  <input
                      type="number"
                      id="luggageCapacity"
                      {...register("luggageCapacity", { required: "Luggage Capacity is required" })}
                      className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.luggageCapacity ? "border-red-500" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.luggageCapacity && <p className="text-red-500 text-sm mt-1">{errors.luggageCapacity.message}</p>}
              </div>
              {/**  Price */}
              <div className="mb-4">
                  <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">
                      Add Price
                  </label>
                  <input
                      type="number"
                      id="pricePerDay"
                      {...register("pricePerDay", { required: "pricePerDay is required" })}
                      className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.pricePerDay ? "border-red-500" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.pricePerDay && <p className="text-red-500 text-sm mt-1">{errors.pricePerDay.message}</p>}
              </div>

              {/* Destination */}
              <div className="mb-4">
                  <label
                      htmlFor="destinations"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Add Destination where this vehicle will be Available for
                  </label>
                  <select
                      id="destinations"
                      {...register("destinations", {
                          required: "Destination is required",
                      })}
                      className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.destinations ? "border-red-500" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  >
                      <option value="">Select a Destination</option>
                      {Array.isArray(destinationInfo) &&
                          destinationInfo.map((type) => (
                              <option key={type._id} value={type._id}>
                                  {type.name}
                              </option>
                          ))}
                  </select>
                  {errors.destinations && (
                      <p className="text-red-500 text-sm mt-1">
                          {errors.destinations.message}
                      </p>
                  )}
              </div>

              {/* Car images */}
              <div className="mb-6">
                  <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-2"
                  >
                      Upload vehicle images
                  </label>
                    {vehicleInfo?.image?.path && !imagePreview && (
                                        <img
                                            src={`${baseURL}/${vehicleInfo.image.path}`} // Adjust path if needed
                                            alt="Current Logo"
                                            className="h-40 w-auto mb-4 rounded-md shadow-md"
                                        />
                                    )}
                  <input
                      type="file"
                      id="image"
                      accept="image/*"
                    //   multiple
                      {...register("image")}
                      onChange={handleImageChange}
                      className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.image ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {imagePreview && (
                      <img
                          src={imagePreview}
                          alt="New Preview"
                          className="h-40 w-auto mt-4 rounded-md shadow-md"
                      />
                  )}
              </div>
              <div className="flex justify-between">
                  <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                       Update
                  </button>
              </div>
          </form>
    </main>
  )
}

export default UpdateVehicles