import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { getActivitiesByDestinationId } from '../../features/Actions/Activities/activitiesAction';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";

const UpdatePackage = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const location = useLocation();
    const { packageData } = location.state;
    const { destinationActivities } = useSelector(state=> state.activities)
    console.log("The package data", packageData);
    
    let options2 = [];
    if (destinationActivities) {
        options2 = Array.isArray(destinationActivities) && destinationActivities?.map((activity) => ({
            value: activity?._id,
            label: activity?.name
        }));
    }

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            ...packageData,
            itinerary: packageData.itinerary || [],
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
   
    useEffect(()=>{
        dispatch(getActivitiesByDestinationId(packageData?.packageDestination))
    },[packageData])
    const onSubmit = (data) => {
        console.log("Updated Package Data:", data);
        // API call to update the package using data
    };

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className="p-6 bg-gray-100 rounded-md">
                <h1 className="text-2xl font-bold mb-4">Update Package</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Basic Details */}
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

                    {/* Itinerary */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
                        {itineraryFields.map((field, index) => (
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
                                            defaultValue={[options2[0], options2[1]]}
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
                              

                                <button
                                    type="button"
                                    onClick={() => removeItinerary(index)}
                                    className="text-red-500"
                                >
                                    Remove Day
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                appendItinerary({ location: "", title: "", description: "" })
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
