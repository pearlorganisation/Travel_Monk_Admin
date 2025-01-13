import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { getActivitiesByDestinationId } from '../../features/Actions/Activities/activitiesAction';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { getDestinations } from '../../features/Actions/Destination/destinationAction';
import slugify from "slugify";
import { updatePackage } from '../../features/Actions/TripPackages/packageAction';

const UpdatePackage = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const location = useLocation();
    const { packageData } = location.state;
    const { destinationActivities } = useSelector(state=> state.activities)
    const { destinationInfo } = useSelector((state) => state.destinations);
    console.log("The package data", packageData);
    
    let options2 = [];
    if (destinationActivities) {
        options2 = Array.isArray(destinationActivities) && destinationActivities?.map((activity) => ({
            value: activity?._id,
            label: activity?.name
        }));
    }

    const { control, handleSubmit, register, watch,setValue,formState:{errors} } = useForm({
        defaultValues: {
            ...packageData,
            packageDestination: packageData?.packageDestination
,
            itinerary: packageData.itinerary?.map(item => {
                const temp = item?.activities?.map(act => {
                    return {label:act?.name,value:act?._id}
                })
                return {...item ,activities:temp}
            }) || [],
            inclusions: packageData.inclusions || [],
            exclusions: packageData.exclusions || [],
        },
    });

    const {
        fields: itineraryFields,
        append: appendItinerary,
        remove: removeItinerary,
    } = useFieldArray({
        control,
        name: "itinerary",
    });

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
    useEffect(()=>{
        dispatch(getActivitiesByDestinationId(packageData?.packageDestination))
    },[packageData])
      useEffect(() => {
        dispatch(getDestinations());
      }, [dispatch]);


    const onSubmit = (data) => {
        console.log("Updated Package Data:", data);
        const formData = new FormData();
        formData.append("banner",bannerImage);
        formData.append("image", packageImage);

        dispatch(updatePackage({...data, id:packageData._id})).then((res)=>{
            console.log("the package daata",res)
        })
     };

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className="p-6 bg-gray-100 rounded-md">
                <h1 className="text-2xl font-bold mb-4">Update Package</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Basic Details */}
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

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Package Name</label>
                        <input
                            {...register("name")}
                            className="w-full p-2 border rounded"
                            placeholder="Package Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Slug</label>
                        <input
                            {...register("slug")}
                            className="w-full p-2 border rounded"
                            placeholder="Slug"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Starting Price</label>
                        <input
                            {...register("startingPrice")}
                            type="number"
                            className="w-full p-2 border rounded"
                            placeholder="Starting Price"
                        />
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
                            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.duration ? "border-red-500" : "border-gray-300"
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
                            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.duration ? "border-red-500" : "border-gray-300"
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
                            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.pickDropPoint ? "border-red-500" : "border-gray-300"
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
                            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.pickDropPoint ? "border-red-500" : "border-gray-300"
                                } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        {errors.pickDropPoint && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pickDropPoint.message}
                            </p>
                        )}
                    </div>
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
                            {...register("banner")}
                            onChange={handleBannerImage}
                            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.banner ? "border-red-500" : "border-gray-300"
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
                            {...register("image")}
                            onChange={handlePackageImage}
                            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.image ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                        />
                    </div>
                    {/* Itinerary */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
                        {itineraryFields.map((field, index) => {
                            console.log(field?.activities,"field")
                            return (
                                <div key={field.id} className="mb-4 border p-4 rounded">
                                    <label className="block mb-2 font-semibold">Day {index + 1}</label>
                                    <input
                                        {...register(`itinerary.${index}.location`)}
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder="Location"
                                    />
                                    <input
                                        {...register(`itinerary.${index}.title`)}
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder="Title"
                                    />
                                    <textarea
                                        {...register(`itinerary.${index}.description`)}
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder="Description"
                                    />
                                    <Controller
                                        name={`itinerary.${index}.activities`}
                                        control={control}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref, isLoading },
                                        }) => (
                                            <Select
                                                options={options2}
                                                isMulti
                                                name={name}
                                                ref={ref}
                                                // Map the current value to the format React Select expects
                                                value={value || []}
                                                // Handle changes and map back to the required format for the form state
                                                onChange={(selectedOptions) => {
                                                    const selectedActivityIds = selectedOptions || [];
                                                    onChange(selectedActivityIds);
                                                }}
                                            />
                                        )}
                                    />


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
                                appendItinerary({day:"", location: "", title: "", description: "", activities:"" })
                            }
                            className="text-blue-500"
                        >
                            Add Day
                        </button>
                    </div>

                    {/* Inclusions */}
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

                    {/* Exclusions */}
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

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Package
                    </button>
                </form>
            </div>
        </main>
         
    );
};

export default UpdatePackage;
