import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateDestination } from "../../features/Actions/Destination/destinationAction";

import slugify from "slugify";
import { useForm } from "react-hook-form";
const EditDestination = () => {
  //   const { id } = useParams();
  const dispatch = useDispatch();

  const location = useLocation();

  const destination = location.state;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  /** Slug Logic */
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

  /** State for Images */
  const [bannerImage, setBannerImage] = useState(
    destination?.banner?.path || null
  );
  const [destinationImage, setDestinationImage] = useState(
    destination?.image?.path || null
  );

  /** Handlers for image uploads */
  const handleBannerImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handlePackageImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDestinationImage(file);
    }
  };

  const submitForm = (data) => {
    const formData = new FormData();
    if (bannerImage instanceof File) formData.append("banner", bannerImage);
    if (destinationImage instanceof File)
      formData.append("image", destinationImage);

    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("startingPrice", data.startingPrice);
    formData.append("type", data.type);

    dispatch(
      updateDestination({ id: destination?._id, updatedData: formData })
    );
  };
  if (!destination) {
    return <div>No destination data available</div>;
  }
  //   useEffect(() => {
  //     console.log("asdsadsa", destination);
  //   }, [destination]);
  const isLoading = false;

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>Edit Destination</div>
      {isLoading ? (
        <h1> Loading ...</h1>
      ) : (
        destination && (
          <form onSubmit={handleSubmit(submitForm)}>
            {/** Destination Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Destination Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Destination name is required",
                })}
                defaultValue={destination?.name}
                className={`mt-1 p-2 block w-full rounded-md border-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/** Slug */}
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
                defaultValue={destination?.slug}
                readOnly
                className="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            {/** Starting Price */}
            <div className="mb-4">
              <label
                htmlFor="startingPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Starting Price
              </label>
              <input
                type="text"
                id="startingPrice"
                {...register("startingPrice", {
                  required: "Starting price is required",
                })}
                defaultValue={destination?.startingPrice}
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

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Package Destination
              </label>
              <select
                id="type"
                {...register("type", {
                  required: "Destination type is required",
                })}
                defaultValue={destination?.type || ""}
                className={`mt-1 block w-full p-2 rounded-md border-2 ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Indian">Indian</option>
                <option value="International">International</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/** Banner Image */}
            <div className="mb-6">
              <label
                htmlFor="banner"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Banner of Destination
              </label>
              <input
                type="file"
                id="banner"
                accept="image/*"
                onChange={handleBannerImage}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700"
              />
              {bannerImage && (
                <div className="mt-4">
                  <img
                    src={
                      bannerImage instanceof File
                        ? URL.createObjectURL(bannerImage)
                        : `${
                            import.meta.env.VITE_APP_BACKEND_DEV_BASE_URL
                          }/${bannerImage}`
                    }
                    alt="Banner Preview"
                    className="max-w-xs h-auto rounded"
                  />
                </div>
              )}
            </div>

            {/** Destination Image */}
            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image of Destination
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handlePackageImage}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700"
              />
              {destinationImage && (
                <div className="mt-4">
                  <img
                    src={
                      destinationImage instanceof File
                        ? URL.createObjectURL(destinationImage)
                        : `${
                            import.meta.env.VITE_APP_BACKEND_DEV_BASE_URL
                          }/${destinationImage}`
                    }
                    alt="Destination Preview"
                    className="max-w-xs h-auto rounded"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              Update Destination
            </button>
            <button
              type="button"
              className="bg-gray-500 px-4 py-2 rounded-md text-white ml-4"
              //   onClick={onClose}
            >
              Cancel
            </button>
          </form>
        )
      )}
    </main>
  );
};

export default EditDestination;
