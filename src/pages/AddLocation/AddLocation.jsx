import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDestinations } from '../../features/Actions/Destination/destinationAction'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { addLocation } from '../../features/Actions/Location/locationAction';
const AddLocation = () => {
    const dispatch = useDispatch();
    const { destinationInfo } = useSelector((state) => state.destinations);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch
    } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "locations",
    });

    useEffect(() => {
        dispatch(getDestinations({ page: 1 }));
    }, [dispatch]);
    const destinationId = watch("destination")
    console.log('--------------destination', destinationId)
    const onSubmit = (data) => {
    
        dispatch(addLocation({id:destinationId, data}))
    };

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <h2 className="text-4xl font-bold mb-4">Add Location Data</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Destination Field */}
                <div className="mb-6">
                    <label
                        htmlFor="destination"
                        className="block text-gray-700 font-bold mb-1"
                    >
                        Destination
                    </label>
                    <select
                        {...register("destination", { required: true })}
                        id="destination"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a Destination</option>
                        {Array.isArray(destinationInfo) && destinationInfo?.map((dest) => (
                            <option key={dest._id} value={dest._id}>
                                {dest.name}
                            </option>
                        ))}
                    </select>
                    {errors.destination && (
                        <span className="text-red-500 text-xs italic">
                            Destination is required
                        </span>
                    )}
                </div>

                {/* Day and Locations */}
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                        <h3 className="text-lg font-bold mb-2">Day {index + 1}</h3>

                        {/* Day Field */}
                        <div className="mb-4">
                            <label
                                htmlFor={`location-${index}-day`}
                                className="block text-gray-700 font-bold mb-1"
                            >
                                Day
                            </label>
                            <Controller
                                name={`locations.${index}.day`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="number"
                                        {...field}
                                        id={`location-${index}-day`}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                )}
                            />
                            {errors.locations?.[index]?.day && (
                                <span className="text-red-500 text-xs italic">
                                    Day is required
                                </span>
                            )}
                        </div>

                        {/* Locations Array */}
                        <div className="mb-4">
                            <h4 className="text-md font-bold mb-2">Locations</h4>
                            <Controller
                                name={`locations.${index}.location`}
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <div>
                                        {field.value.map((loc, locIndex) => (
                                            <div
                                                key={locIndex}
                                                className="mb-2 p-2 bg-gray-200 rounded"
                                            >
                                                {/* Name Input */}
                                                <input
                                                    type="text"
                                                    placeholder="Location Name"
                                                    {...register(
                                                        `locations.${index}.location.${locIndex}.name`,
                                                        { required: true }
                                                    )}
                                                    className="block w-full p-2 mb-1 border rounded"
                                                />
                                                {errors.locations?.[index]?.location?.[locIndex]?.name && (
                                                    <span className="text-red-500 text-xs italic">
                                                        Name is required
                                                    </span>
                                                )}

                                                {/* Coordinates Input */}
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Latitude"
                                                        {...register(
                                                            `locations.${index}.location.${locIndex}.latitude`,
                                                            { required: true }
                                                        )}
                                                        className="block w-full p-2 border rounded"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Longitude"
                                                        {...register(
                                                            `locations.${index}.location.${locIndex}.longitude`,
                                                            { required: true }
                                                        )}
                                                        className="block w-full p-2 border rounded"
                                                    />
                                                </div>
                                                {/* {errors.locations?.[index]?.location?.[locIndex]?.latitude && (
                                                        <span className="text-red-500 text-xs italic">
                                                            Coordinates are required
                                                        </span>
                                                    )} */}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                field.onChange([
                                                    ...field.value,
                                                    { name: "", coordinates: [0, 0] },
                                                ])
                                            }
                                            className="mt-2 p-2 bg-blue-500 text-white rounded"
                                        >
                                            Add Location
                                        </button>
                                    </div>
                                )}
                            />
                        </div>

                        {/* Remove Day */}
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2 bg-red-500 text-white rounded"
                        >
                            Remove Day
                        </button>
                    </div>
                ))}

                {/* Add New Day */}
                <button
                    type="button"
                    onClick={() =>
                        append({
                            day: "",
                            location: [{ name: "", coordinates: [0, 0] }],
                        })
                    }
                    className="p-2 bg-green-500 text-white rounded"
                >
                    Add Day
                </button>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3"
                >
                    Submit
                </button>
            </form>
        </main>
    );
};
export default AddLocation