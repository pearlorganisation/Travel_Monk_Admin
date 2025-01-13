/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDestination,
  getDestinations,
  togglePopularity,
} from "../../features/Actions/Destination/destinationAction";
import { X } from "lucide-react";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const GetAllDestinations = ({
  destination,
  onDeleteClick,
  togglePopularity,
}) => {
  const navigate = useNavigate();

  // const togglePops = (id) => {
  //   dispatch(togglePopularity(id))
  //     .then(() => {
  //       // Reload the destinations after successful toggle
  //       dispatch(getDestinations({ page: 1 }));
  //     })
  //     .catch((error) => {
  //       console.error("Failed to toggle popularity:", error);
  //     });
  // };

  return (
    <tr
      key={destination._id}
      className="bg-white dark:bg-gray-800 hover:bg-gray-50"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {destination?.name}
      </th>
      <td className="px-6 py-4">
        <img
          src={`${import.meta.env.VITE_APP_BACKEND_DEV_BASE_URL}/${
            destination?.banner?.path
          }`}
          className="w-16 h-16"
          alt="Banner"
        />
      </td>

      <td className="px-6 py-4">
        <img
          src={`${import.meta.env.VITE_APP_BACKEND_DEV_BASE_URL}/${
            destination?.image?.path
          }`}
          className="w-16 h-16"
          alt="Banner"
        />
      </td>

      <td className="px-6 py-4">{destination?.type}</td>

      <td className="px-6 py-4">{destination?.startingPrice}</td>

      <td className="px-6 py-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={destination?.isPopular || false}
            onChange={() => togglePopularity(destination._id)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:ring-offset-2 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-5 peer-checked:after:bg-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </td>

      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap space-x-4"
      >
        <button
          className="px-4 py-2 bg-green-400 rounded-md "
          onClick={() =>
            navigate(`/view-destination/${destination?._id}`, {
              state: destination,
            })
          }
        >
          View
        </button>
        <button
          className="px-4 py-2 bg-blue-400 rounded-md "
          onClick={() =>
            navigate(`/edit-destination/${destination?._id}`, {
              state: destination,
            })
          }
        >
          Edit
        </button>

        <button
          className="px-4 py-2 bg-red-400 rounded-md"
          onClick={() => onDeleteClick(destination)} // Trigger delete modal in parent
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

const AllDestinations = () => {
  const dispatch = useDispatch();

  const { destinationInfo, pagination, isLoading, isError } = useSelector(
    (state) => state.destinations
  );

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(pagination?.total / pagination?.limit);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const togglePops = (id) => {
    dispatch(togglePopularity(id))
      .then(() => {
        dispatch(getDestinations({ page: currentPage }));
      })
      .catch((error) => {
        console.error("Failed to toggle popularity:", error);
      });
  };

  const handlePageClick = (page) => {
    console.log(page, "current page");
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    dispatch(getDestinations({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleDelete = (activity) => {
    setSelectedDestination(activity); // Set selected activity to delete
    setDeleteModal(true); // Open the delete confirmation modal
  };

  const confirmDelete = () => {
    if (selectedDestination) {
      dispatch(deleteDestination(selectedDestination._id)) // Delete the activity
        .then(() => {
          dispatch(getDestinations({ page: currentPage }));
          setDeleteModal(false); // Close the modal
          setSelectedDestination(null); // Reset selected activity
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          setDeleteModal(false); // Close modal even if error occurs
          setSelectedDestination(null); // Reset selected activity
        });
    }
  };

  const cancelDelete = () => {
    setDeleteModal(false); // Close the modal without deleting
    setSelectedDestination(null); // Reset selected activity
  };

  // if (isLoading) {
  //   return (
  //     <main className="flex-1 p-8 mt-16 ml-64">
  //       <div className="text-center text-gray-500">
  //         Loading destinations ...
  //       </div>
  //     </main>
  //   );
  // }

  if (isError) {
    return (
      <main className="flex-1 ">
        <div className="text-center text-red-500">Error </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 ml-64">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Destinations </h1>
        {destinationInfo?.length === 0 ? (
          <div className="text-center text-gray-500">
            No destinations available
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Name
                    </th>

                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Banner
                    </th>

                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Popular
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(destinationInfo) &&
                    destinationInfo.map((destination) => (
                      <GetAllDestinations
                        key={destination._id}
                        destination={destination}
                        onDeleteClick={handleDelete}
                        togglePopularity={togglePops}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {destinationInfo?.length > 0 && Array.isArray(destinationInfo) && (
          <Pagination
            paginate={pagination}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && selectedDestination && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Delete Destination</h2>
              <button
                onClick={cancelDelete}
                className="text-gray-600 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the destination "
              {selectedDestination?.name}"?
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

export default AllDestinations;
