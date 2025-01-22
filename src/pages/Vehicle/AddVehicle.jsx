import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestinations } from "../../features/Actions/Destination/destinationAction";
import { useForm } from "react-hook-form";
import { addVehicle } from "../../features/Actions/Vehicles/vehicleAction";

const AddVehicle = () => {
    const dispatch = useDispatch();

    const { destinationInfo } = useSelector((state) => state.destinations);
    const { isCreated    } = useSelector(state=>state.vehicles)
    const { register, handleSubmit , reset,formState:{errors}} = useForm()
    /**  images state handler */
    const [selectedImages, setSelectedImages] = useState([])
    
    /** handle for selecting the images */
       const [image, setImage] = useState(null);
        const [imagePreview, setImagePreview] = useState(null);

    const handleSelectImage = (e)=>{
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
    
    const SubmitForm = async (data) =>{
     const formData = {...data, image:image};
     try {
         const result = await dispatch(addVehicle(formData)).unwrap()
         console.log('--------------result is', result)
         if (result?.success === true){
                reset()
            }else{
                alert("Failed to create the vehicle")
            }
          
     } catch (error) {
        console.log("The error is",error) // change in production version
     }
         }
 

    useEffect(()=>{
        dispatch(getDestinations({page:1}))
    },[dispatch]);
    
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">Add Vehicle</div>
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
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.destinations ? "border-red-500" : "border-gray-300"
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
          <input
            type="file"
            id="image"
            accept="image/*"
            // multiple
            {...register("image", { required: "Vehicle Images are required" })}
            onChange={handleSelectImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3"
          >
            Add Vehicle
          </button>
          {/* <button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Cancel
                  </button> */}
        </div>
      </form>
    </main>
  );
};

export default AddVehicle;
