import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { updateLocationCoordinates } from '../../features/Actions/Location/locationAction';

const UpdateLocation = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { locationData } = location.state ?? {};
    console.log("The location data:", locationData);

    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            day: locationData?.day || '',
            location: locationData?.location?.map((item) => ({
                name: item.name,
                latitude: item.coordinates.coordinates[0],
                longitude: item.coordinates.coordinates[1],
            })) || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "location",
    });

    // Submit form handler
    const submitForm = (data) => {
        console.log('Form Submitted:', data);
        const formData = { ...data, id: locationData?._id };
        dispatch(updateLocationCoordinates(formData));
    };

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div>
                <h1 className="text-2xl font-bold mb-4">Update Location</h1>
                <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                    {/* Day Input */}
                    <div>
                        <label className="block font-medium mb-1">Day</label>
                        <input
                            {...register('day', { required: 'Day is required' })}
                            type="text"
                            disabled
                            className="border rounded p-2 w-full"
                        />
                        {errors.day && <p className="text-red-500 text-sm">{errors.day.message}</p>}
                    </div>

                    {/* Location Coordinates */}
                    <div>
                        <label className="block font-medium mb-1">Locations</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-2 mb-4">
                                <h1>Location name</h1>
                                <div>
                                    <label className="block font-medium mb-1">Location Name</label>
                                    <Controller
                                        name={`location[${index}].name`}
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    className="border rounded p-2 w-full"
                                                />
                                                {errors.location?.[index]?.name && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors.location[index].name.message}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Latitude Input */}
                                <div>
                                    <label className="block text-sm">Latitude</label>
                                    <Controller
                                        name={`location[${index}].latitude`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="number"
                                                step="any"
                                                className="border rounded p-2 w-full"
                                            />
                                        )}
                                    />
                                </div>

                                {/* Longitude Input */}
                                <div>
                                    <label className="block text-sm">Longitude</label>
                                    <Controller
                                        name={`location[${index}].longitude`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="number"
                                                step="any"
                                                className="border rounded p-2 w-full"
                                            />
                                        )}
                                    />
                                </div>

                                {/* Remove Location Button */}
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 bg-red-500 text-white rounded"
                                >
                                    Remove Location
                                </button>
                            </div>
                        ))}

                        {/* Add Location Button */}
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    name: "",
                                    coordinates: [0, 0],
                                })
                            }
                            className="p-2 bg-green-500 text-white rounded"
                        >
                            Add Location
                        </button>
                    </div>

                    {/* Add New Day Button */}
                    {/* <button
                        type="button"
                        onClick={() =>
                            append({
                                day: '',
                                location: [{ name: '', coordinates: [0, 0] }],
                            })
                        }
                        className="p-2 bg-green-500 text-white rounded"
                    >
                        Add New Day
                    </button> */}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>
                </form>
            </div>
        </main>
    );
};

export default UpdateLocation;
