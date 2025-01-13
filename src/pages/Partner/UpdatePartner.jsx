import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getPartnerType } from '../../features/Actions/Partner/partnerTypeAction'
import { useForm } from 'react-hook-form'
import { baseURL } from '../../services/axiosInterceptor'
import { Button } from 'flowbite-react'
import { updatePartner } from '../../features/Actions/Partner/getAllPartnerAction'

const UpdatePartner = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const { partnerData } = location.state ?? {};
    const { partner_type } = useSelector((state) => state.partnertype);
    const { register,watch, handleSubmit, formState:{errors} } = useForm({
        defaultValues: {
            ...partnerData,
            partnerLogo: `${baseURL}/${partnerData.partnerLogo.path}`,
            partnerType: partnerData.partnerType._id

        }
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    console.log('the partner data is ', partnerData)

    // useEffect(()=>{
    //     dispatch(getPartnerType())
    // },[])
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const onSubmit=(data)=>{
    const actionResult =dispatch(updatePartner({...data,id:id, partnerLogo:image})) 
    }
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>UpdatePartner</div>
          <form onSubmit={handleSubmit(onSubmit)}>
              {/* Partner Name */}
              <div className="mb-4">
                  <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700">
                      Add Partner Name
                  </label>
                  <input
                      type="text"
                      id="partnerName"
                      {...register("partnerName", { required: "Partner Name is required" })}
                      className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.partnerName ? "border-red-500" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.partnerName && <p className="text-red-500 text-sm mt-1">{errors.partnerName.message}</p>}
              </div>

              {/* Partner Type */}
              <div className="mb-4">
                  <label htmlFor="partnerType" className="block text-sm font-medium text-gray-700">
                      Add Partner Type
                  </label>
                  <select
                      id="partnerType"
                      {...register("partnerType", { required: "Partner Type is required" })}
                      className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.partnerType ? "border-red-500" : "border-gray-300"
                          } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  >
                      <option value="">Select a Partner Type</option>
                      {Array.isArray(partner_type) &&
                          partner_type.map((type) => (
                              <option key={type._id} value={type._id}>
                                  {type.partnerTypeName}
                              </option>
                          ))}
                  </select>
                  {errors.partnerType && <p className="text-red-500 text-sm mt-1">{errors.partnerType.message}</p>}
              </div>

              {/* Partner Logo */}
              <div className="mb-6">
                  <label htmlFor="partnerLogo" className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Partner Logo
                  </label>
                  {partnerData?.partnerLogo?.path && !imagePreview && (
                      <img
                          src={`${baseURL}/${partnerData.partnerLogo.path}`} // Adjust path if needed
                          alt="Current Logo"
                          className="h-40 w-auto mb-4 rounded-md shadow-md"
                      />
                  )}
                  <input
                      type="file"
                      id="partnerLogo"
                      accept="image/*"
                      {...register("partnerLogo")}
                      onChange={handleImageChange}
                      className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.partnerLogo ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {imagePreview && (
                      <img
                          src={imagePreview}
                          alt="New Preview"
                          className="h-40 w-auto mt-4 rounded-md shadow-md"
                      />
                  )}
              </div>
              <button>Submit </button>
          </form>
    </main>
  )
}

export default UpdatePartner