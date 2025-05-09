import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getFullyCustomisedEnquiryFormById, updateFullyCustomizedEnquiry } from '../../features/Actions/CustomizationEnquiries/customisationEnquiriesAction'
import { duration } from '@mui/material'
import Select from "react-select";
import { getActivitiesByDestinationId } from '../../features/Actions/Activities/activitiesAction'
import { getHotelsByDestination } from '../../features/Actions/Hotels/hotelsAction'
import { getDestinationVehicle } from '../../features/Actions/DestinationVehicle/destinationVehicleAction'
import { baseURL } from '../../services/axiosInterceptor'

const UpdateFullyCustomisationEnquiry = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleFullyCustomisedPackageEnquiry } = useSelector((state) => state.enquiries)
    const { destinationActivities } = useSelector(state=> state.activities)
    const { destinationHotels } = useSelector(state=> state.hotels)
    const { destinationVehicles } = useSelector(state=> state.destination_vehicle)
     const [currentLimit, setCurrentLimit] = useState(10)
     const handleSetCurrentLimit = (e)=>{
       // console.log("the value and type is", typeof e.target.value, e.target.value)
       setCurrentLimit(e.target.value)
     }
   


    /** states for the vehicle */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [selectedVehicleName, setSelectedVehicleName] = useState("");
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [selectedVehiclePrice, setSelectedVehiclePrice] = useState("");
    const [selectedVehicleImage, setSelectedVehicleImage] = useState("");
    console.log("the selected vehicle id is", selectedVehicleId)
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
    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        setValue,
        watch,
        reset
    } = useForm();

    // When data is loaded, update form values
    useEffect(() => {
        if (singleFullyCustomisedPackageEnquiry) {
            reset({
                name: singleFullyCustomisedPackageEnquiry?.name || "",
                email: singleFullyCustomisedPackageEnquiry?.email || "",
                mobileNumber: singleFullyCustomisedPackageEnquiry?.mobileNumber || "",
                message: singleFullyCustomisedPackageEnquiry?.message || "",
                numberOfTravellers: singleFullyCustomisedPackageEnquiry?.numberOfTravellers || "",
                estimatedPrice: singleFullyCustomisedPackageEnquiry?.estimatedPrice || "",
                startDate: singleFullyCustomisedPackageEnquiry?.startDate
                    ? new Date(singleFullyCustomisedPackageEnquiry?.startDate)?.toISOString()?.split("T")[0]
                    : "",
                endDate: singleFullyCustomisedPackageEnquiry?.endDate
                    ? new Date(singleFullyCustomisedPackageEnquiry?.endDate)?.toISOString()?.split("T")[0]
                    : "",
                "duration.days": singleFullyCustomisedPackageEnquiry?.duration?.days || "",
                "duration.nights": singleFullyCustomisedPackageEnquiry?.duration?.nights || "",
                itinerary: singleFullyCustomisedPackageEnquiry?.itinerary?.map(item => ({
                    ...item,
                    date: item?.date ? new Date(item?.date)?.toISOString()?.split("T")[0] : "",
                    selectedActivities: item?.selectedActivities || []
                })) || [],
                inclusions: singleFullyCustomisedPackageEnquiry?.inclusions || [],
                exclusions: singleFullyCustomisedPackageEnquiry?.exclusions || [],
                selectedVehicle: singleFullyCustomisedPackageEnquiry?.selectedVehicle || ""
            });
            setSelectedVehicleId(singleFullyCustomisedPackageEnquiry?.selectedVehicle?._id)
        }
    }, [singleFullyCustomisedPackageEnquiry, reset]);


    // console.log("the selected vehicle by default will be", selectedVehicleId)
     const [options2, setOptions2] = useState([])
         {/** adding destination activities */}
         useEffect(()=>{
                 if (Array.isArray(destinationActivities)) {
                     const mappedOptions = destinationActivities.map((activity) => ({
                         value: activity?._id,
                         label: activity?.name,
                     }));
                     setOptions2(mappedOptions);
                 }
             },[destinationActivities])
   const {
               fields: itineraryFields,
               append: appendItinerary,
               remove: removeItinerary,
           } = useFieldArray({
               control,
               name: "itinerary",
           });

           {/** inclusion and exclusion */}
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
    useEffect(()=>{
       dispatch(getFullyCustomisedEnquiryFormById(id))
    },[])
    useEffect(()=>{
        const destinationId = singleFullyCustomisedPackageEnquiry?.destination?._id;
        if(destinationId){
      dispatch(getActivitiesByDestinationId(destinationId));
    //   dispatch(getHotelsByDestination({ id: destinationId ,limit:40}));
      dispatch(getDestinationVehicle(destinationId));
    }
    }, [singleFullyCustomisedPackageEnquiry?.destination?._id])
    const navigate = useNavigate()

    /** for getting hotels based on the limit */
 useEffect(()=>{
     const destinationId = singleFullyCustomisedPackageEnquiry?.destination?._id;
    if (destinationId){
      dispatch(getHotelsByDestination({ id: destinationId, limit: currentLimit }));
    }
 }, [singleFullyCustomisedPackageEnquiry?.destination?._id,currentLimit])

    const submitForm =(data)=>{
        const formData = { ...data, id: id, selectedVehicle:selectedVehicleId }
        dispatch(updateFullyCustomizedEnquiry(formData));
        // navigate("/full-customized-enquiries")
    }
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
          <div className='flex justify-between'>
              <div>
                  Update Fully Customised Enquiry
              </div>
              <div>
                  <input
                      id='limit'
                      type='number'
                      placeholder='Change the limit from here'
                      onChange={(e) => handleSetCurrentLimit(e)}
                  />
              </div>
          </div>
          {singleFullyCustomisedPackageEnquiry && <>   <form onSubmit={handleSubmit(submitForm)} >
              {/* User Selection */}
              <div>
                  <label htmlFor='user' className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                  </label>
                  <input
                      id='user'
                      type='text'
                      {...register("name", { required: "User is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
              </div>
              {/**email */}
              <div>
                  <label htmlFor='email' className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                  </label>
                  <input
                      id='user'
                      type='text'
                      {...register("email", { required: "Email is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
              </div>
              {/** mobile number */}
              <div>
                  <label htmlFor='mobileNumber' className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                  </label>
                  <input
                      id='mobileNumber'
                      type='text'
                      {...register("mobileNumber", { required: "Mobile Number is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.mobileNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
                  )}
              </div>
              {/** message */}
              <div>
                  <label htmlFor='message' className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                  </label>
                  <input
                      id='message'
                      type='text'
                      {...register("message", { required: "Message is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
              </div>
              {/** no of Travellers section */}
              <div>
                  <label htmlFor='numberOfTravellers' className="block text-sm font-medium text-gray-700 mb-2">
                      Enter No. of Travellers
                  </label>
                  <input
                      id='numberOfTravellers'
                      type='number'
                      {...register("numberOfTravellers", { required: "No of travellers is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.numberOfTravellers ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.numberOfTravellers && (
                      <p className="text-red-500 text-xs mt-1">{errors.numberOfTravellers.message}</p>
                  )}
              </div>
              {/** estimated price */}
              <div>
                  <label htmlFor='estimatedPrice' className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Price
                  </label>
                  <input
                      id='user'
                      type='number'
                      {...register("estimatedPrice", { required: "Estimated price is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.estimatedPrice ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.estimatedPrice && (
                      <p className="text-red-500 text-xs mt-1">{errors.estimatedPrice.message}</p>
                  )}
              </div>
              {/** start date */}
              <div>
                  <label htmlFor='startDate' className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                  </label>
                  <input
                      id='usestartDater'
                      type='date'
                      {...register("startDate", { required: "Start Date is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.startDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
                  )}
              </div>
              {/** End Date */}
              <div>
                  <label htmlFor='endDate' className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                  </label>
                  <input
                      id='endDate'
                      type='date'
                      {...register("endDate", { required: "End Date is required" })}
                      className={`w-full px-4 py-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.endDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
                  )}
              </div>
              {/** duration */}
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
              {/** Itinerary */}
              <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
                  {itineraryFields.map((field, index) => {
                      // console.log(field?.activities, "field")
                      return (
                          <div key={field.id} className="mb-4 border p-4 rounded">
                              <label className="block mb-2 font-semibold">Day {index + 1}</label>
                              <input
                                  {...register(`itinerary.${index}.day`)}
                                  className="w-full p-2 border rounded mb-2"
                                  placeholder="Day"
                              />
                              <div>
                                  <label htmlFor='newDate' className="block text-sm font-medium text-gray-700 mb-2">
                                      Date
                                  </label>
                                  <input
                                      id='newDate'
                                      type='date'
                                      {...register(`itinerary.${index}.date`, { required: " Date is required" })}
                                      className={`w-full px-4 py-2 border rounded-md ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                  />
                                  {errors.date && (
                                      <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                                  )}
                              </div>
                              <div className='mt-1'> 
                                <label htmlFor='Location' className="block text-sm font-medium text-gray-700 mb-2">
                                  Location
                              </label>
                                  <input
                                  id='Location'
                                      {...register(`itinerary.${index}.selectedLocation`)}
                                      className="w-full p-2 border rounded mb-2 "
                                      placeholder="Location"
                                  /></div>
                             <div>
                                  <label htmlFor='description' className="block text-sm font-medium text-gray-700 mb-2">
                                      Description
                                  </label>
                                  <input
                                      {...register(`itinerary.${index}.description`)}
                                      className="w-full p-2 border rounded mb-2"
                                      placeholder="Description"
                                  />
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

                              <button
                                  type="button"
                                  onClick={() => removeItinerary(index)}
                                  className="text-red-500"
                              >
                                  Remove Day
                              </button>
                          </div>
                      )
                  })}
                  <button
                      type="button"
                      onClick={() =>
                          appendItinerary({ day: "", date: "", selectedLocation: "", description:"", selectedHotel: "", selectedActivities: "" })
                      }
                      className="text-blue-500"
                  >
                      Add Day
                  </button>
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

              {/** exclusions field */}
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
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3' type="submit"> Update Package for the user</button>      </form>
              {/** vehicle section */}
             
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
              <div className="p-4">
                  {selectedVehicleName && (
                      <div className="mt-6 p-4 bg-orange-300 rounded-lg shadow-md">
                          <div className="flex flex-row gap-6">
                              <div className="flex flex-col gap-3">
                                  <h3 className="text-xl font-semibold text-blue-700">
                                      Your Selected Vehicle
                                  </h3>
                                  <p className="text-lg">Name: {selectedVehicleName}</p>
                                  <p className="text-lg">Price: {selectedVehiclePrice}</p>
                              </div>

                              <img src={`${baseURL}/${selectedVehicleImage}`} className="w-20 h-20" />
                          </div>
                      </div>
                  )}
              </div></> }
    

    </main>
  )
}

export default UpdateFullyCustomisationEnquiry