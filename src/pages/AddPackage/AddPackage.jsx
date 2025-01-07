import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivitiesByDestinationId, getAllActivities } from "../../features/Actions/Activities/activitiesAction";
import { getAllHotels } from "../../features/Actions/Hotels/hotelsAction";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import slugify from "slugify";
import { getDestinations } from "../../features/Actions/Destination/destinationAction";
import { addPackage } from "../../features/Actions/TripPackages/packageAction";

import Select from "react-select";
/** hotels validator */

const AddPackage = () => {
  const dispatch = useDispatch();
  const { hotelsData } = useSelector((state) => state.hotels);
  const { activitiesData, destinationActivities } = useSelector((state) => state.activities);
  const { destinationInfo } = useSelector((state) => state.destinations);
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    reset,
    resetField,
    setValue,
    formState: { errors },
  } = useForm();

  /** to take multiple itinerary data */
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });


  /** options for hotels */
  let options = Array.isArray(hotelsData)&& hotelsData?.map((hotel) => ({
    value: hotel._id,  
    label: hotel.name,
  }));
  /** getting the selected destination id */
  const destinationId = watch("packageDestination")
  /** option 2 for selecting multiple activities */
  let options2 = [];
  if (destinationActivities) {
    options2 = Array.isArray(destinationActivities) && destinationActivities?.map((activity) => ({
      value: activity?._id,
      label: activity?.name
    }));
  }

 
  console.log("---------options", options2);

  /** to handle multiple inclusion data */
  const [mainInclusionArray, setMainInclusionArray] = useState([]); // To store inclusion array

  /** Handle for adding inclusion data in an array */
  const addInclusionHandle = (inclusionData) => {
    if (inclusionData !== "") {
      // Update the array with the new inclusion
      mainInclusionArray.push(inclusionData);
      console.log("-------mainInclusionArray data", mainInclusionArray);
    }
  };

  /** to handle exclusion data */
  const [mainExclusionArray, setMainExclusionArray] = useState([]);

  const handleExclusionData = (exclusionData) => {
    if (exclusionData !== "") {
      mainExclusionArray.push(exclusionData);
      console.log("--------------main exclusion array", mainExclusionArray);
    }
  };

  /** handle to reset only inclusion  and exclusion field */
  const handleResetInclusionAndExlcusion = (type) => {
    resetField(type); // React hook for resetField to only reset a particular field
  };

  /** slug logic */
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

  /** state for banner image */
  const [bannerImage, setBannerImage] = useState([]);
  /** to handle banner image */
  const handleBannerImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
    }
  };

  /** for Package Image */
  const [packageImage, setPackageImage] = useState([]);
  // package image handle
  const handlePackageImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPackageImage(file);
    }
  };

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    formData.append("image", packageImage);
    dispatch(
      addPackage({
        ...data,
        inclusions: [...mainInclusionArray],
        exclusions: [...mainExclusionArray],
      })
    ).then((res) => {
      // passing whole array of inclusion and exclusion    dont know if necessary
      console.log("Package data", res);
    });
  };


 

  console.log("the destination id", destinationId)
   useEffect(()=>{
    if(destinationId){
    dispatch(getActivitiesByDestinationId(destinationId))}
    return
   },[destinationId])

  /** useEffects */
  useEffect(() => {
    // dispatch(getAllActivities());
    // dispatch(getAllHotels());
    dispatch(getDestinations());
  }, [dispatch]);
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>AddPackage</div>
      <form onSubmit={handleSubmit(submitForm)}>
        {/** package destinations */}
        <div className="mb-4">
          <label
            htmlFor="packageDestination"
            className="block text-sm font-medium text-gray-700"
          >
            Add Package Destination
          </label>
          <select
            id="packageDestination"
            {...register("packageDestination", {
              required: "Package Destination is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.packageDestination ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          >
            <option value="">Select a Package Destination</option>
            {Array.isArray(destinationInfo) &&
              destinationInfo.map((destination) => (
                <option key={destination._id} value={destination._id}>
                  {destination.name}
                </option>
              ))}
          </select>
          {errors.packageDestination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.packageDestination.message}
            </p>
          )}
        </div>
        {/** itinerary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Add Itinarary Data</h2>
          {fields.map((itinary, index) => (
            <div
              key={itinary.id}
              className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold mb-2">Day {index + 1}</h3>
              <div className="mb-2">
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
              <div className="mb-2">
                <label
                  htmlFor={`day-location-${index}`}
                  className="block text-gray-700 font-bold mb-1"
                >
                  Day Location
                </label>
                <Controller
                  name={`itinerary.${index}.location`}
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
                  errors.itinerary[index].location && (
                    <span className="text-red-500 text-xs italic">
                      Day Location is required
                    </span>
                  )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`day-title-${index}`}
                  className="block text-gray-700 font-bold mb-1"
                >
                  Title
                </label>
                <Controller
                  name={`itinerary.${index}.title`}
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
                  errors.itinerary[index].title && (
                    <span className="text-red-500 text-xs italic">
                      Title is required
                    </span>
                  )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`day-description-${index}`}
                  className="block text-gray-700 font-bold mb-1"
                >
                  Description
                </label>
                <Controller
                  name={`itinerary.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      id={`day-description-${index}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  )}
                />
                {errors.itinerary &&
                  errors.itinerary[index] &&
                  errors.itinerary[index].description && (
                    <span className="text-red-500 text-xs italic">
                      Description is required
                    </span>
                  )}
              </div>
              {/** in future might need */}
              {/* <div className="mb-2">
                <label
                  htmlFor={`day-hotels-${index}`}
                  className="block text-gray-700 font-bold mb-1"
                >
                  Hotel
                </label>
                <Controller
                  name={`itinerary.${index}.hotels`}
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref, isLoading },
                  }) => (
                    <Select
                      options={options}
                      isLoading={isLoading} // Pass your loading state here
                      isMulti={true} // Enable multiple selection
                      onChange={(selectedOptions) => {
                        // Update the value with an array of selected hotel IDs
                        const selectedHotelIds = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [];
                        onChange(selectedHotelIds);
                      }}
                      onBlur={onBlur}
                      value={
                        value
                          ? value.map((hotelId) =>
                              options.find((option) => option.value === hotelId)
                            )
                          : []
                      } // Map IDs back to objects for Select
                      name={name}
                      ref={ref}
                    />
                  )}
                />

                {errors.itinerary &&
                  errors.itinerary[index] &&
                  errors.itinerary[index].hotels && (
                    <span className="text-red-500 text-xs italic">
                      Atleast 1 hotel is required
                    </span>
                  )}
              </div> */}
              <div className="mb-2">
                <label
                  htmlFor={`day-activities-${index}`}
                  className="block text-gray-700 font-bold mb-1"
                >
                  Activities
                </label>
                <Controller
                  name={`itinerary.${index}.activities`}
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref, isLoading },
                  }) => (
                    <Select
                      options={options2}
                      isLoading={isLoading} // Pass your loading state here
                      isMulti={true} // Enable multiple selection
                      onChange={(selectedOptions) => {
                        // Update the value with an array of selected hotel IDs
                        const selectedActivityIds = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [];
                        onChange(selectedActivityIds);
                      }}
                      onBlur={onBlur}
                      value={
                        value
                          ? value.map((activityId) =>
                              options2.find(
                                (option) => option.value === activityId
                              )
                            )
                          : []
                      } // Map IDs back to objects for Select
                      name={name}
                      ref={ref}
                    />
                  )}
                />
                {errors.itinerary &&
                  errors.itinerary[index] &&
                  errors.itinerary[index].activities && (
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
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                day: "",
                location: "",
                title: "",
                description: "",
                hotels: "",
                activities: "",
              })
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Itinary Data
          </button>
        </div>
        {/** package name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Add Package Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Package name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        {/**package slug */}
        <div className="mb-4">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            {...register("slug")}
            readOnly
            className={`shadow-sm bg-gray-50 border ${
              errors.slug ? "border-red-500" : "border-gray-300"
            }text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>
        {/* duration days*/}
        <div className="mb-4">
          <label
            htmlFor="duration.days"
            className="block text-sm font-medium text-gray-700"
          >
            Add Duration Days
          </label>
          <input
            type="number"
            id="duration.days"
            {...register("duration.days", {
              required: "Package Duration Days is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.duration ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>
        {/* duration nights*/}
        <div className="mb-4">
          <label
            htmlFor="duration.nights"
            className="block text-sm font-medium text-gray-700"
          >
            Add Duration Nights
          </label>
          <input
            type="number"
            id="duration.nights"
            {...register("duration.nights", {
              required: "Package Duration Nights is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.duration ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>
        {/* pickupdrop point pickup*/}
        <div className="mb-4">
          <label
            htmlFor="pickDropPoint.pickup"
            className="block text-sm font-medium text-gray-700"
          >
            Add Pickup Point
          </label>
          <input
            type="string"
            id="pickDropPoint.pickup"
            {...register("pickDropPoint.pickup", {
              required: "Package Duration Nights is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.pickDropPoint ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.pickDropPoint && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pickDropPoint.message}
            </p>
          )}
        </div>
        {/* pickupdrop point drop*/}
        <div className="mb-4">
          <label
            htmlFor="pickDropPoint.drop"
            className="block text-sm font-medium text-gray-700"
          >
            Add Drop Point
          </label>
          <input
            type="string"
            id="pickDropPoint.drop"
            {...register("pickDropPoint.drop", {
              required: "Package Duration Nights is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.pickDropPoint ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.pickDropPoint && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pickDropPoint.message}
            </p>
          )}
        </div>
        {/* starting price*/}
        <div className="mb-4">
          <label
            htmlFor="startingPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Add Starting Price
          </label>
          <input
            type="text"
            id="startingPrice"
            {...register("startingPrice", {
              required: "Starting Price is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.startingPrice ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.startingPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startingPrice.message}
            </p>
          )}
        </div>
        {/*  inclusions */}
        <div className="mb-4">
          <label
            htmlFor="inclusions"
            className="block text-sm font-medium text-gray-700"
          >
            Add Inclusions
          </label>
          <input
            type="text"
            id="inclusions"
            {...register("inclusions")}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.inclusions ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          <button
            type="button"
            onClick={(e) => {
              const inclusionData = getValues("inclusions"); // getting the value of inclusion
              if (inclusionData) {
                addInclusionHandle(inclusionData); // passing to inclusion handle
                handleResetInclusionAndExlcusion("inclusions");
              }
            }}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {" "}
            Add Inclusion
          </button>
          {errors.inclusions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.inclusions.message}
            </p>
          )}
        </div>
        {mainInclusionArray.length > 0 && (
          <ul>
            {mainInclusionArray.map((item, index) => (
              <li key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        )}
        {/*  Exclusion */}
        <div className="mb-4">
          <label
            htmlFor="exclusions"
            className="block text-sm font-medium text-gray-700"
          >
            Add exclusions
          </label>
          <input
            type="text"
            id="exclusions"
            {...register("exclusions")}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.exclusions ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          <button
            type="button"
            onClick={(e) => {
              const exclusionData = getValues("exclusions"); // Get value of exclusions field
              if (exclusionData) {
                handleExclusionData(exclusionData); // Pass to function to add to array
                handleResetInclusionAndExlcusion("exclusions");
              }
            }}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {" "}
            Add Inclusion
          </button>
          {errors.exclusions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.exclusions.message}
            </p>
          )}
        </div>
        {mainExclusionArray.length > 0 && (
          <ul>
            {mainExclusionArray.map((item, index) => (
              <li key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        )}
       
        {/** banner image */}
        <div className="mb-6">
          <label
            htmlFor="banner"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Banner of Package
          </label>
          <input
            type="file"
            id="banner"
            accept="image/*"
            {...register("banner", { required: "Banner is required" })}
            onChange={handleBannerImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${
              errors.banner ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>

        {/** package image */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Image of Package
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: "Banner is required" })}
            onChange={handlePackageImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>

        <button type="submit"> Add Package</button>
      </form>
    </main>
  );
};

export default AddPackage;
