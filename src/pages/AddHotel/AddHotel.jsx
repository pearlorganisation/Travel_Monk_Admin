import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestinations } from "../../features/Actions/Destination/destinationAction";
import { useFieldArray, useForm } from "react-hook-form";
import { addHotel } from "../../features/Actions/Hotels/hotelsAction";
const AddHotel=()=> {
  const dispatch = useDispatch()
  const { destinationInfo } = useSelector((state)=> state.destinations);
  const { register, handleSubmit, watch, control, getValues, resetField,setValue, formState:{errors}} = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "amenities",
  });

   
const submitForm =(data)=>{
  dispatch(addHotel(data))
}

 /** state for baner image */
 const [bannerImage, setBannerImage] = useState([])
 const handleBannerImage =(e)=>{
  const file = e.target.files[0];
  if(file){
   setBannerImage(file)
  }
 }
  


  useEffect(()=>{
    dispatch(getDestinations())
  },[])
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>AddHotel</div>
      <form onSubmit={handleSubmit(submitForm)}>
        {/**-------------Hotel Name--------------*/}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Add Hotel Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Hotel name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        {/**------------------Select Destination------------------*/}
        <div className="mb-4">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Select Destination
          </label>
           <select
            id="destination"
            {...register("destination", { required: "Destination is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.destination ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
           >
            <option value="">Select a Destination</option>
            {Array.isArray(destinationInfo) &&
              destinationInfo.map((destination) => (
                <option key={destination._id} value={destination._id}>
                  {destination.name}
                </option>
              ))}
           </select>
          {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
        </div>
        {/*--------------City------------*/}
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Add city Name
          </label>
          <input
            type="text"
            id="city"
            {...register("city", { required: "city name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.city ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>
        {/**-----------state------------ */}
        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            Add state Name
          </label>
          <input
            type="text"
            id="state"
            {...register("state", { required: "state name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.state ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>
        {/**-----------Country------------ */}
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Add country Name
          </label>
          <input
            type="text"
            id="country"
            {...register("country", { required: "country name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.country ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>
        {/**-------------Starting Price----------*/}
        <div className="mb-4">
          <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700">
            Add Hotel Starting Price
          </label>
          <input
            type="number"
            id="startingPrice"
            {...register("startingPrice", { required: "startingPrice name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.startingPrice ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.startingPrice && <p className="text-red-500 text-sm mt-1">{errors.startingPrice.message}</p>}
        </div>
        {/**-------------Discount----------*/}
        <div className="mb-4">
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
            Add Discount
          </label>
          <input
            type="number"
            id="discount"
            {...register("discount", { required: "discount name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.discount ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
        </div>
        {/** banner image */}
        <div className="mb-6">
          <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Banner Image
          </label>
          <input
            type="file"
            id="banner"
            accept="image/*"
            {...register("banner", { required: "Banner is required" })}
            onChange={handleBannerImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.banner ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>

        {/**------------Amenities--------------*/}
        <h3 className="text-md font-medium">Add Amenities</h3>
        <div className="mb-6">{fields.map((item, index) => (
          <div key={item.id} className="border-b pb-4 mb-4 flex flex-col md:flex-row gap-4 items-start">
            {/* Amenity Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Amenity Name</label>
              <input
                {...register(`amenities.${index}.name`, { required: "Name is required" })}
                className="border rounded p-2 w-full"
                placeholder="Amenity Name"
              />
            </div>

            {/* Amenity Icon */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Amenity Icon</label>
              <input
                type="file"
                accept="image/*"
                {...register(`amenities.${index}.icon`)}
                className="border rounded p-2 w-full"
              />
            </div>

            <button
              type="button"
              className="mt-6 md:mt-0 text-red-500 hover:underline"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>

        ))}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => append({ name: "", icon: null })}
          >
            + Add Amenity
          </button>
        </div>
         <button type="submit">Submit Hotel Form</button>
      </form>
    </main>
      );
};

export default AddHotel;
