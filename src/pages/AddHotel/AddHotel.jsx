import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestinations } from "../../features/Actions/Destination/destinationAction";
import { useFieldArray, useForm } from "react-hook-form";
import { addHotel } from "../../features/Actions/Hotels/hotelsAction";
import slugify from "slugify";
/** hotels validator */
const bestSeller = [
  {
    id: 1,
    value: true,
    name: "True"
  },
  {
    id: 2,
    value: false,
    name: "False"
  }
]
const AddHotel=()=> {
  const dispatch = useDispatch()
  const { destinationInfo } = useSelector((state)=> state.destinations);
  const { register, handleSubmit, watch, control, getValues, resetField,setValue, formState:{errors}} = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "amenities",
  });
 /** state for baner image */
 const [bannerImage, setBannerImage] = useState([])
 const handleBannerImage =(e)=>{
  const file = e.target.files[0];
  if(file){
   setBannerImage(file)
  }
 }
const slugName = watch("name");
  useEffect(() => {
    if (slugName) {
      const slug = slugify(slugName, {
        lower: true,
        strict: true,
      });
      setValue("slug", slug);
    }
  }, [slugName, setValue]);
 
 const submitForm = (data) => {

    dispatch(addHotel(data))
  }




  useEffect(()=>{
    dispatch(getDestinations({page:1}))
  },[])
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">Add Hotel</div>
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
        {/** slug */}
        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="name"
            disabled
            {...register("slug", { required: "Hotel name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.slug ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>
        {/** is best seller */}
        <div className="mb-4">
          <label
            htmlFor="isBest"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Best Seller
          </label>
          <select
            id="isBest"
            {...register("isBest", {
              required: "required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.isBest ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          >
            <option value="">Select if Best Seller</option>
            {Array.isArray(bestSeller) &&
              bestSeller.map((seller) => (
                <option key={seller.id} value={seller.value}>
                  {seller.name}
                </option>
              ))}
          </select>
          {errors.isBestSeller && (
            <p className="text-red-500 text-sm mt-1">
              {errors.isBestSeller.message}
            </p>
          )}
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
            Add City Name
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
            Add State Name
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
            Add Country Name
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
        {/**-------------Estimated Price----------*/}
        <div className="mb-4">
          <label htmlFor="estimatedPrice" className="block text-sm font-medium text-gray-700">
            Add Hotel Starting Price
          </label>
          <input
            type="number"
            id="estimatedPrice"
            {...register("estimatedPrice", { required: "estimatedPrice name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.estimatedPrice ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.estimatedPrice && <p className="text-red-500 text-sm mt-1">{errors.estimatedPrice.message}</p>}
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
        {/** google maps url */}
        <div className="mb-4">
          <label htmlFor="googleMapsUrl" className="block text-sm font-medium text-gray-700">
            Add Map Location
          </label>
          <input
            type="text"
            id="googleMapsUrl"
            {...register("googleMapsUrl", { required: "googleMapsUrl name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.googleMapsUrl ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.googleMapsUrl && <p className="text-red-500 text-sm mt-1">{errors.googleMapsUrl.message}</p>}
        </div>
        {/** banner image */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Banner Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: "Banner is required" })}
            onChange={handleBannerImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.image ? "border-red-500" : "border-gray-300"
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
                {...register(`amenities.${index}`, { required: "Name is required" })}                className="border rounded p-2 w-full"
                placeholder="Amenity Name"
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
            onClick={() => append("")}
          >
            + Add Amenity
          </button>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3">Submit Hotel Form</button>
      </form>
    </main>
      );
};

export default AddHotel;
