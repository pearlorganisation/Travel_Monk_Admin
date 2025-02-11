import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPrebuiltEnquiryByID, getPreBuiltPackageCustomisationEnquiries, updatePrebuiltPackageEnquiry } from '../../features/Actions/CustomizationEnquiries/customisationEnquiriesAction'
import { getDestinationVehicle } from '../../features/Actions/DestinationVehicle/destinationVehicleAction'
import { getHotelsByDestination } from '../../features/Actions/Hotels/hotelsAction'
import { getActivitiesByDestinationId } from '../../features/Actions/Activities/activitiesAction'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import Select from "react-select";
import { baseURL } from '../../services/axiosInterceptor'

const UpdatePrebuiltPackageEnquiries = () => {
    const { id } = useParams()
    console.log("the id ius", id)
    const dispatch = useDispatch()
    const { singlePrebuiltPackageEnquiry } = useSelector(state => state.enquiries)
    const { destinationVehicles } = useSelector(state=> state.destination_vehicle)
    const { destinationActivities } = useSelector(state=> state.activities)
    const { destinationHotels } = useSelector(state=> state.hotels)

/** states for the vehicle */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedVehicleName, setSelectedVehicleName] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState("");
  const [selectedVehicleImage, setSelectedVehicleImage] = useState("");

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
  /** options for the selecting activities */
  const [options2, setOptions2] = useState([])
    const { control, handleSubmit, register, watch, setValue, formState:{errors} } = useForm({
      defaultValues:{
        numberOfTravellers: singlePrebuiltPackageEnquiry?.numberOfTravellers,
        estimatedPrice:singlePrebuiltPackageEnquiry?.estimatedPrice,
        name: singlePrebuiltPackageEnquiry?.name,
        email:singlePrebuiltPackageEnquiry?.email,
        mobileNumber:singlePrebuiltPackageEnquiry?.mobileNumber,
        message:singlePrebuiltPackageEnquiry?.message,
        itinerary: singlePrebuiltPackageEnquiry?.itinerary?.map(item=>{
          const temp = item?.selectedActivities?.map(act=>act) || [];
          // add in future
          const temp2 ={name: item?.selectedHotel?.name, hotel: item?.selectedHotel?.hotel?._id } 
          // console.log("the default selected hotel are",temp2)
          return { ...item, selectedActivities: temp, selectedHotel: temp2 } // , selectedHotel:temp2   // will add this when the hotel are populated correctly
        })
    }})

    const {
            fields: itineraryFields,
            append: appendItinerary,
            remove: removeItinerary,
        } = useFieldArray({
            control,
            name: "itinerary",
        });
    
    useEffect(()=>{
     dispatch(getPrebuiltEnquiryByID(id))
    },[dispatch,id])
    
    useEffect(()=>{
    
      dispatch(getDestinationVehicle(singlePrebuiltPackageEnquiry?.package?.packageId?.packageDestination));
      dispatch(getHotelsByDestination({ id: singlePrebuiltPackageEnquiry?.package?.packageId?.packageDestination }))
      dispatch(getActivitiesByDestinationId(singlePrebuiltPackageEnquiry?.package?.packageId?.packageDestination ))
  
    },[])


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
    
  
   const stringifyHotelValue = (value) => {
    if (!value) return '';
    
    // If we're getting a field value, it should already be in {name, hotel} format
    if (value.name && value.hotel) {
      return JSON.stringify({
        name: value.name,
        hotel: value.hotel
      });
    }
    
    // If we're getting a hotel object directly from destinationHotels
    if (value._id) {
      return JSON.stringify({
        name: value.name,
        hotel: value._id
      });
    }
    
    return '';
  };

  const parseHotelValue = (value) => {
    if (!value || value === '') return '';
    try {
      const parsed = JSON.parse(value);
      // Ensure we always return an object with name and hotel properties
      return {
        name: parsed.name || '',
        hotel: parsed.hotel || ''
      };
    } catch {
      return '';
    }
  };

const onSubmitForm=async(data)=>{
const formData ={...data, id:id, selectedVehicle:{name: selectedVehicleName, vehicle:selectedVehicleId}};
console.log("the formdata is", formData)
dispatch(updatePrebuiltPackageEnquiry(formData))
dispatch(getPrebuiltEnquiryByID(id))
}
    return (

    <main className="flex-1 p-8 mt-16 ml-64">
      <div>UpdatePrebuiltPackageEnquiries</div>
      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {/** for name */}
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>
              <input
                type="text"
                {...register("name", { required: "User is required" })}
                className={`w-full px-4 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            {/** for email */}
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Email
              </label>
              <input
                type="text"
                {...register("email", { required: "User email is required" })}
                className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            {/** for mobile number */}
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Mobile Number
              </label>
              <input
                type="text"
                {...register("mobileNumber", { required: "User mobileNumber is required" })}
                className={`w-full px-4 py-2 border rounded-md ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
              )}
            </div>
            {/** message */}
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Message
              </label>
              <input
                type="text"
                {...register("message", { required: "User message is required" })}
                className={`w-full px-4 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>
             {/** number of travellers */}
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. of Travellers
              </label>
              <input
                type="number"
                {...register("numberOfTravellers", { required: " numberOfTravellers is required" })}
                className={`w-full px-4 py-2 border rounded-md ${errors.numberOfTravellers ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.numberOfTravellers && (
                <p className="text-red-500 text-xs mt-1">{errors.numberOfTravellers.message}</p>
              )}
            </div>
            {/** estimated price */}
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Price
              </label>
              <input
                type="number"
                {...register("estimatedPrice", { required: " numberOfTravellers is required" })}
                className={`w-full px-4 py-2 border rounded-md ${errors.estimatedPrice ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.estimatedPrice && (
                <p className="text-red-500 text-xs mt-1">{errors.estimatedPrice.message}</p>
              )}
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
                    <input
                      {...register(`itinerary.${index}.location`)}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Location"
                    />
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
                        render={({ field }) => {
                      

                          return (
                            <select
                              {...field}
                              value={stringifyHotelValue(field.value)}
                              onChange={(e) => {
                                const parsedValue = parseHotelValue(e.target.value);
                           
                                field.onChange(parsedValue);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
                            >
                              <option value="">Choose Hotel</option>
                              {Array.isArray(destinationHotels) &&
                                destinationHotels.map((hotel) => {
                                  const optionValue = stringifyHotelValue({
                                    name: hotel.name,
                                    hotel: hotel._id
                                  });
                                  // console.log('Option value for', hotel.name, ':', optionValue);

                                  return (
                                    <option
                                      key={hotel._id}
                                      value={optionValue}
                                    >
                                      {hotel.name}
                                    </option>
                                  );
                                })}
                            </select>
                          );
                        }}
                      />
                      {errors.itinerary?.[index]?.selectedHotel && (
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
                  appendItinerary({ day: "", location: "",selectedHotel:"", selectedActivities: "" })
                }
                className="text-blue-500"
              >
                Add Day
              </button>
            </div>
            {/** for selecting the vehicle */}
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
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3' type="submit"> Created Package for the user</button>
        </form>
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
              </div>
      </div>
    </main>
  )
}

export default UpdatePrebuiltPackageEnquiries