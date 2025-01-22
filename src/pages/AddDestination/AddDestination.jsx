import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import slugify from "slugify";

import Select from "react-select";
import { addDestination } from "../../features/Actions/Destination/destinationAction";

const AddDestination = () => {
  const dispatch = useDispatch();

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
  const [destinationImage, setDestinationImage] = useState([]);
  // package image handle
  const handlePackageImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDestinationImage(file);
    }
  };

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    formData.append("image", destinationImage);
    dispatch(
      addDestination({
        ...data,
      })
    ).then((res) => {
      // passing whole array of inclusion and exclusion    dont know if necessary
      console.log("Destination data", res);
    });
  };

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">Add Destination</div>
      <form onSubmit={handleSubmit(submitForm)}>
        {/** Destination name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Add Destination Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Destination name is required" })}
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

        <div className="mb-4">
          <label
            htmlFor="startingPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Add Popularity
          </label>
          <input
            type="checkbox"
            id="isPopular"
            defaultChecked={false}
            {...register("isPopular", {
              required: "Popularity is required",
            })}
            className={`mt-1 p-2 block w-20 rounded-md border-2 ${
              errors.isPopular ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.isPopular && (
            <p className="text-red-500 text-sm mt-1">
              {errors.isPopular.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Add Package Destination
          </label>
          <select
            id="type"
            {...register("type", {
              required: "Destination Type is required",
            })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${
              errors.type ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          >
            <option value="">Select a Destination Type</option>

            <option value="Indian">Indian</option>
            <option value="International">International</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>
        {/** banner image */}
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
            {...register("banner", { required: "Banner is required" })}
            onChange={handleBannerImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${
              errors.banner ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>

        {/** destination image */}
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
            {...register("image", { required: "Banner is required" })}
            onChange={handlePackageImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3"
        >
          {" "}
          Add Destination{" "}
        </button>
      </form>
    </main>
  );
};

export default AddDestination;
