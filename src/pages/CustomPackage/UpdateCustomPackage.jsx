import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getActivitiesByDestinationId } from '../../features/Actions/Activities/activitiesAction'
import { getDestinationVehicle } from '../../features/Actions/DestinationVehicle/destinationVehicleAction'
import { getHotelsByDestination } from '../../features/Actions/Hotels/hotelsAction'
import { baseURL } from '../../services/axiosInterceptor'
import Select from "react-select";
import { duration } from '@mui/material'
import { updateCustomPackageById } from '../../features/Actions/CustomPackage/customPackage'
const UpdateCustomPackage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { customPackage } = location.state ?? {}
  const { register, handleSubmit, formState:{errors}, watch , control} = useForm({
    defaultValues:{
      packageName: customPackage?.packageName ?? '',
      numberOfTravellers: customPackage?.numberOfTravellers,
      price: customPackage?.price,
      startDate: customPackage?.startDate
        ? new Date(customPackage?.startDate).toISOString().split("T")[0]
        : "",
      endDate: customPackage?.endDate
        ? new Date(customPackage?.endDate).toISOString().split("T")[0]
        : "",
      "duration.days": customPackage?.duration?.days,
      "duration.nights": customPackage?.duration?.nights,
      inclusions: customPackage?.inclusions.map(el=> el),
      exclusions: customPackage?.exclusions,
      itinerary: customPackage?.itinerary?.map((el)=>{
        const temp = el?.selectedActivities.map((item)=>{
          return item;
        })
       const hotelId = el?.selectedHotel?._id;
      return {...el, selectedActivities:temp, selectedHotel: hotelId}  
      })
    }
  })
  const { destinationActivities } = useSelector(
    (state) => state.activities
  );
  const { destinationVehicles } = useSelector(
    (state) => state.destination_vehicle
  );
  const { destinationHotels } = useSelector(state => state.hotels)
  const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [selectedVehicleName, setSelectedVehicleName] = useState("");
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [selectedVehiclePrice, setSelectedVehiclePrice] = useState("");
    const [selectedVehicleImage, setSelectedVehicleImage] = useState("");
    // console.log("the destination id is", destinationId)
    console.log("the vehicle image url", selectedVehicleImage)
    /** handle for selecting the vehicles */
    const handleSelectVehicle = (
      vehicleName,
      vehiclePrice,
      vehicleId,
      vehicleImage
    ) => {
      setSelectedVehicleId(vehicleId);
      setSelectedVehicleName(vehicleName);
      setSelectedVehiclePrice(vehiclePrice);
      setSelectedVehicleImage(vehicleImage);
    };
  
  const { fields, append, remove} = useFieldArray({
      control,
      name:"itinerary"
    })
  const {
          fields: inclusionsFields,
          append: appendInclusion,
          remove: removeInclusion,
      } = useFieldArray({
          control,
          name: "inclusions",
      });
  const {
          fields: exclusionsFields,
          append: appendExclusion,
          remove: removeExclusion,
      } = useFieldArray({
          control,
          name: "exclusions",
      });
  let options2 = [];
  if (destinationActivities) {
    options2 =
      Array.isArray(destinationActivities) &&
      destinationActivities?.map((activity) => ({
        value: activity?._id,
        label: activity?.name,
      }));
  }
  console.log("the data is", customPackage);
  useEffect(()=>{
    dispatch(getActivitiesByDestinationId(customPackage?.destination));
    dispatch(getDestinationVehicle(customPackage?.destination))
    dispatch(getHotelsByDestination({id:customPackage?.destination}))
  },[])

  const submitForm =(data)=>{
  const formData = {...data, id: customPackage?._id, selectedVehicle: selectedVehicleId ?? customPackage?.selectedVehicle?._id}
  dispatch(updateCustomPackageById(formData))
  }
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>UpdateCustomPackage</div>
      <form onSubmit={handleSubmit(submitForm)} >
        {/** package section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Name
            </label>
            <input
              type="text"
              {...register("packageName", { required: "Package Name is required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.packageName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.packageName && (
              <p className="text-red-500 text-xs mt-1">{errors.packageName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travellers
            </label>
            <input
              type="number"
              {...register("numberOfTravellers", { required: "Travellers count is required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.numberOfTravellers ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.numberOfTravellers && (
              <p className="text-red-500 text-xs mt-1">{errors.numberOfTravellers.message}</p>
            )}
          </div>
        </div>
        {/* Pricing and Dates Section */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              {...register("startDate", { required: "Start Date is required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              {...register("endDate", { required: "End Date is required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/* Duration Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (Days)
            </label>
            <input
              type="number"
              {...register("duration.days", { required: "Days are required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.duration ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (Nights)
            </label>
            <input
              type="number"
              {...register("duration.nights", { required: "Nights are required" })}
              className={`w-full px-4 py-2 border rounded-md ${errors.duration ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/** Inclusions field */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Inclusions</h2>
          {inclusionsFields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center">
              <input
                {...register(`inclusions.${index}`)}
                className="w-full p-2 border rounded"
                placeholder="Inclusion"
              />
              <button
                type="button"
                onClick={() => removeInclusion(index)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendInclusion("")}
            className="text-blue-500"
          >
            Add Inclusion
          </button>
        </div>
        {/** exclusion field */}
        <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Exclusions</h2>
                  {exclusionsFields.map((field, index) => (
                    <div key={field.id} className="mb-2 flex items-center">
                      <input
                        {...register(`exclusions.${index}`)}
                        className="w-full p-2 border rounded"
                        placeholder="Exclusion"
                      />
                      <button
                        type="button"
                        onClick={() => removeExclusion(index)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendExclusion("")}
                    className="text-blue-500"
                  >
                    Add Exclusion
                  </button>
         </div>
        {/** itinary field */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-4'> Add Itinerary</h2>
          {fields?.map((itinary, index) => {
            console.log("selected hotel is", itinary)
            // console.log("selected activities is", itinary.s)

            return (

              <div className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md"
                key={itinary.id}>
                <h3 className="text-lg font-bold mb-2"> Day {index + 1}</h3>
                {/**  day section */}
                <div className='mb-2'>
                  <label
                    htmlFor={`day-itinary-${index}`}
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Day
                  </label>
                  <Controller
                    name={`itinerary.${index}.day`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        id={`day-itinary-${index}`}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    )}
                  />
                  {errors.itinerary &&
                    errors.itinerary[index] &&
                    errors.itinerary[index].day && (
                      <span className="text-red-500 text-xs italic">
                        Day is required
                      </span>
                    )}

                </div>
                {/**    location ection */}
                <div className="mb-2">
                  <label
                    htmlFor={`day-location-${index}`}
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Day Location
                  </label>
                  <Controller
                    name={`itinerary.${index}.selectedLocation`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        id={`day-itinary-${index}`}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    )}
                  />
                  {errors.itinerary &&
                    errors.itinerary[index] &&
                    errors.itinerary[index].selectedLocation && (
                      <span className="text-red-500 text-xs italic">
                        Day Location is required
                      </span>
                    )}
                </div>
                {/**Hotels Section */}

                <div className="mb-2">
                  <label
                    htmlFor={`day-hotel-${index}`}
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Hotel
                  </label>
                  <Controller
                    name={`itinerary.${index}.selectedHotel`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <select
                        value={value} // Ensure value is bound to the field
                        onChange={(e) => onChange(e.target.value)} // Update the field on change
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200"
                      >
                        <option value="">Choose Hotel</option>
                        {Array.isArray(destinationHotels) &&
                          destinationHotels.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>
                              {hotel.name}
                            </option>
                          ))}
                      </select>
                    )}
                  />
                  {errors.itinerary &&
                    errors.itinerary[index] &&
                    errors.itinerary[index].selectedHotel && (
                      <span className="text-red-500 text-xs italic">
                        Select a Hotel
                      </span>
                    )}
                </div>
                {/** activities section */}
                <div className="mb-2">
                  <label
                    htmlFor={`day-activities-${index}`}
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Activities
                  </label>
                  <Controller
                    name={`itinerary.${index}.selectedActivities`}
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref, isLoading },
                    }) => (
                      <Select
                        options={options2}
                        isMulti={true}
                        onChange={(selectedOptions) => {
                          onChange(selectedOptions);
                        }}
                        onBlur={onBlur}
                        value={value}
                        name={name}
                        ref={ref}
                      />
                    )}
                  />
                  {errors.itinerary &&
                    errors.itinerary[index] &&
                    errors.itinerary[index].selectedActivities && (
                      <span className="text-red-500 text-xs italic">
                        Atleast 1 activity is required
                      </span>
                    )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove Itinary
                </button>
              </div>
            )
          })}
          <button
            type="button"
            onClick={() =>
              append({
                day: "",
                selectedLocation: "",
                selectedHotel: "",
                selectedActivities: "",
              })
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Itinary Data
          </button>
        </div> 

         {/** vehicle section */}
            <div>
                  <button
                  type='button'
                   className="mt-4 bg-white px-6 py-1 border border-[#1f1f1f] rounded-sm lg:min-w-72 flex flex-row items-center justify-center gap-2">
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3334 5.16669H7.33341V0.166687H5.66675V5.16669H0.666748V6.83335H5.66675V11.8334H7.33341V6.83335H12.3334V5.16669Z"
                        fill="#1F1F1F"
                      />
                    </svg>
                    <button
                    type='button'
                      onClick={openModal}
                      className="px-4 py-2  text-black font-bold rounded hover:bg-blue-600 hover:text-white"
                    >
                      Add a Vehicle ( Compulsory )
                    </button>
                  </button>
                </div>
                {isModalOpen && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                      <h2 className="text-xl font-bold mb-4">Select a Vehicle</h2>
        
                      {/* Vehicle List */}
                      <div className=" flex flex-row gap-6">
                        {Array.isArray(destinationVehicles) && destinationVehicles?.map((vehicle) => (
                          <div
                            key={vehicle?._id}
                            onClick={() => {
                              handleSelectVehicle(
                                vehicle?.vehicleName,
                                vehicle?.pricePerDay,
                                vehicle?._id,
                                vehicle?.image?.path
                              );
                              closeModal(); // Close the modal after selection
                            }}
                            className="p-4 border rounded-lg shadow-md cursor-pointer bg-purple-300 h-56"
                          >
                            <p className="text-lg font-semibold">
                              Vehicle: {vehicle?.vehicleName}
                            </p>
                            {/* <p className="text-gray-600">
                            Price: {vehicle?.pricePerDay} /- per day
                          </p> */}
        
                            <img
                              src={`${baseURL}/${vehicle?.image?.path}`}
                              className="w-28 h-20 mt-8"
                            />
                          </div>
                        ))}
                      </div>
        
                      {/* Close button */}
                      <button
                      type='button'
                        onClick={closeModal}
                        className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3' type="submit">Update the Package </button>
      </form>
    </main>
  )
}

export default UpdateCustomPackage