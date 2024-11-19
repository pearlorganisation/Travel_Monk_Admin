import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { getPartnerType } from '../../features/Actions/Partner/partnerTypeAction';

const AddPartner = () => {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null); // to store the image
    const [imagePreview, setImagePreview] = useState(null); // to preview the image on page
    
    const { partner_type } = useSelector((state)=> state.partnertype)
    useEffect(()=>{
        dispatch(getPartnerType())
    },[])

    
    const { register, handleSubmit, formState:{ errors }} = useForm();
    

/*-----------------------for image file handling-------------------------*/
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

/*-------------------------for when submitting the file------------------------ */
    const onSubmit = async (data) => {
        console.log("Form Data 255", data);

        const formData = new FormData();
        formData.append("profileLogo", image);
         
    // send dispatch for creating the partner in future
         
    };
  return (
      <main className="flex-1 p-8 mt-16 ml-64">
          <div className="text-4xl font-bold mb-4">Add Partner</div>
          <form>

              {/*---------------------Partner Name-------------------------*/}
              <div className="mb-4">
                  <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Add Partner</label>
                  <input
                      type="text"
                      id="partnerName"
                      {...register("partnerName")}
                      className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.partnerName && <p className="text-red-500 text-sm mt-1">{errors.partnerName.message}</p>}
              </div>

              {/*---------------------Partner Type Section-------------------------*/}

              <div className="mb-4">
                  <label htmlFor="partnerType" className="block text-sm font-medium text-gray-700">
                      Add Partner Type
                  </label>
                  <select
                      id="partnerType"
                      {...register("partnerType")}
                      className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                      <option value="">Select a Partner Type</option>
                      {Array.isArray(partner_type) && partner_type?.map((type) => (
                          <option key={type._id} 
                              value={type?.partnerTypeName}>
                              {type?.partnerTypeName}
                          </option>
                      ))}
                  </select>
                  {errors.partnerType && <p className="text-red-500 text-sm mt-1">{errors.partnerType.message}</p>}
              </div>


              {/*---------------------Partner Logo Section-------------------------*/}
              <div className="mb-6">
                  <label
                      htmlFor="partnerLogo"
                      className="block text-sm font-medium text-gray-700 mb-2"
                  >
                      Upload Partner Logo
                  </label>
                  <input
                      type="file"
                      id="partnerLogo"
                      accept="image/*"
                      {...register("partnerLogo", {
                          required: "Partner Logo image is required",
                          onChange: (e) => {
                              handleImageChange(e);
                          },
                      })}
                      className={`block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            ${errors.partnerLogo
                              ? "border-red-500"
                              : "border-gray-300"
                          } 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {/* Display image preview */}
                  {imagePreview && (
                      <div className="mt-4">
                          <img
                              src={imagePreview}
                              alt="Selected"
                              className="h-40 w-auto rounded-md shadow-md"
                          />
                      </div>
                  )}
              </div>
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                  Create Partner
              </button>
          </form>
      </main>

  )
}

export default AddPartner

{/*---------------------Partner Logo Section-------------------------*/ }
{/* Image Upload Section */ }
 