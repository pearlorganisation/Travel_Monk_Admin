// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDestinations } from "../../features/Actions/Destination/destinationAction";
// import { useForm } from "react-hook-form";
// import {
//   addActivity,
//   getActivityByID,
// } from "../../features/Actions/Activities/activitiesAction";
// import { useParams } from "react-router-dom";

// const EditActivity = () => {
//   const dispatch = useDispatch();
//   const { destinationInfo } = useSelector((state) => state.destinations);
//   const { singleActivity } = useSelector((state) => state.activities);
//   const { id } = useParams();

//   console.log("Activity ID", id);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     dispatch(addActivity(data));
//   };
//   useEffect(() => {
//     dispatch(getDestinations());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getActivityByID(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (singleActivity?.data) {
//       setValue("name", singleActivity?.data?.name);
//       setValue("destination", singleActivity?.data?.destination);
//     }
//   }, [singleActivity, setValue]);
//   console.log(singleActivity, "single Activity");
//   return (
//     <main className="flex-1 p-8 mt-16 ml-64">
//       <div>Edit Activity</div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Vehicle Name */}
//         <div className="mb-4">
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Add Activity Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             {...register("name", {
//               required: "Activity name is required",
//             })}
//             className={`mt-1 p-2 block w-full rounded-md border-2 ${
//               errors.name ? "border-red-500" : "border-gray-300"
//             } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//           )}
//         </div>

//         {/* Destination */}
//         <div className="mb-4">
//           <label
//             htmlFor="destination"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Add Destination where this activity will be Available for
//           </label>
//           <select
//             id="destination"
//             {...register("destination", {
//               required: "Destination is required",
//             })}
//             className={`mt-1 p-2 block w-full rounded-md border-2 ${
//               errors.destination ? "border-red-500" : "border-gray-300"
//             } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
//           >
//             <option value="">Select a Destination</option>
//             {Array.isArray(destinationInfo) &&
//               destinationInfo.map((type) => (
//                 <option key={type._id} value={type._id}>
//                   {type.name}
//                 </option>
//               ))}
//           </select>
//           {errors.destination && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.destination.message}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Update Activity
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default EditActivity;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestinations } from "../../features/Actions/Destination/destinationAction";
import { useForm } from "react-hook-form";
import {
  addActivity,
  getActivityByID,
  updateActivity,
} from "../../features/Actions/Activities/activitiesAction";
import { useParams } from "react-router-dom";

const EditActivity = () => {
  const dispatch = useDispatch();
  const { destinationInfo } = useSelector((state) => state.destinations);
  const { singleActivity } = useSelector((state) => state.activities);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Destructure the setValue from react-hook-form to update form values
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updateActivity({ id: id, userData: data })); // or edit activity if required
  };

  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivityByID(id)); // Fetch activity by ID to populate form fields
  }, [dispatch, id]);

  // Set form values when singleActivity data is fetched
  useEffect(() => {
    if (singleActivity?.data) {
      // Set the fetched activity data to the form inputs using setValue
      setValue("name", singleActivity?.data?.name);
      setValue("destination", singleActivity?.data?.destination);
    }
  }, [singleActivity, setValue]); // Only run when singleActivity data changes

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>Edit Activity</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Activity Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Activity Name
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
            Destination
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Activity
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditActivity;
