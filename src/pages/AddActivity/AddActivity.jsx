import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestinations } from "../../features/Actions/Destination/destinationAction";
import { useForm } from "react-hook-form";
import { addActivity } from "../../features/Actions/Activities/activitiesAction";

const AddActivity = () => {
  const dispatch = useDispatch();
  const { destinationInfo } = useSelector((state) => state.destinations);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addActivity(data));
  };
  useEffect(() => {
    dispatch(getDestinations({page:1}));
  }, [dispatch]);
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">Add Activity</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Vehicle Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Add Activity Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Activity name is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Destination */}
        <div className="mb-4">
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700"
          >
            Add Destination where this activity will be Available for
          </label>
          <select
            id="destination"
            {...register("destination", {
              required: "Destination is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.destination ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          >
            <option value="">Select a Destination</option>
            {Array.isArray(destinationInfo) &&
              destinationInfo.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
          </select>
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3"
          >
            Add Activity
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddActivity;
