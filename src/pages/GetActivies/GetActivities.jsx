/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteActivity,
  getAllActivities,
} from "../../features/Actions/Activities/activitiesAction";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const GetAllActivities = ({ activity, onDeleteClick }) => {
  const navigate = useNavigate();
  return (
    <tr
      key={activity._id}
      className="bg-white dark:bg-gray-800 hover:bg-gray-50"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {activity?.name.slice(0, 60)}
      </th>
      <td className="px-6 py-4">{activity?.destination?.name}</td>

      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap space-x-4"
      >
        <button
          className="px-4 py-2 bg-blue-400 rounded-md "
          onClick={() => navigate(`/edit-activity/${activity._id}`)}
        >
          Edit
        </button>

        <button
          className="px-4 py-2 bg-red-400 rounded-md"
          onClick={() => onDeleteClick(activity)} // Trigger delete modal in parent
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

const AllActivitiesList = () => {
  const dispatch = useDispatch();
  const { activitiesData, loading, error, paginate } = useSelector(
    (state) => state.activities
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null); // Track the selected activity to delete

  console.log(activitiesData, "my activities");
  console.log(paginate, "my paginate");

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(paginate?.total / paginate?.limit);

  const handlePageClick = (page) => {
    console.log(page, "current page");
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    dispatch(getAllActivities({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleDelete = (activity) => {
    setSelectedActivity(activity); // Set selected activity to delete
    setDeleteModal(true); // Open the delete confirmation modal
  };

  const confirmDelete = () => {
    if (selectedActivity) {
      dispatch(deleteActivity(selectedActivity._id)) // Delete the activity
        .then(() => {
          dispatch(getAllActivities()); // Refresh the activities list
          setDeleteModal(false); // Close the modal
          setSelectedActivity(null); // Reset selected activity
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          setDeleteModal(false); // Close modal even if error occurs
          setSelectedActivity(null); // Reset selected activity
        });
    }
  };

  const cancelDelete = () => {
    setDeleteModal(false); // Close the modal without deleting
    setSelectedActivity(null); // Reset selected activity
  };

  if (loading) {
    return (
      <main className="flex-1 p-8 mt-16 ml-64">
        <div className="text-center text-gray-500">Loading activities...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 ">
        <div className="text-center text-red-500">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 ml-64">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Activities</h1>
        {activitiesData?.length === 0 ? (
          <div className="text-center text-gray-500">
            No activities available
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Activity Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Destination
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(activitiesData) &&
                    activitiesData.map((activity) => (
                      <GetAllActivities
                        key={activity._id}
                        activity={activity}
                        onDeleteClick={handleDelete} // Pass the delete handler to each activity row
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activitiesData?.length > 0 && Array.isArray(activitiesData) && (
          <Pagination
            paginate={paginate}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && selectedActivity && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Delete Activity</h2>
              <button
                onClick={cancelDelete}
                className="text-gray-600 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the activity "
              {selectedActivity?.name}"?
            </p>
            <div className="flex justify-end">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AllActivitiesList;
