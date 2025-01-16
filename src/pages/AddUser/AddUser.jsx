import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import { addUserByAdmin } from '../../features/Actions/Users/getAllUsersAction';

const AddUser = () => {
    const dispatch = useDispatch()
    const{ register ,handleSubmit, formState:{errors}, watch} = useForm()
    const { addUsers } = useSelector(state=> state.users)
    const { isLoading } = addUsers ?? {}
    const submitForm= async(data)=>{
    dispatch(addUserByAdmin(data))
    }
  return (
      <main className="flex-1 p-8 mt-16 ml-64">
          <div>Add User</div>
           
              <form onSubmit={handleSubmit(submitForm)}>
                  <div className="mx-auto max-w-xs">
                      <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="text"
                          placeholder="Full Name"
                          {...register("name", { required: "Full name is required" })}
                      />
                      {errors.name && (
                          <p className="text-red-500 text-sm mt-2">
                              {errors.name.message}
                          </p>
                      )}

                      <input
                          className="w-full px-8 py-4 mt-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="email"
                          placeholder="Email"
                          {...register("email", {
                              required: "Email is required",
                              pattern: {
                                  value:
                                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Please enter a valid email address",
                              },
                          })}
                      />
                      {errors.email && (
                          <p className="text-red-500 text-sm mt-2">
                              {errors.email.message}
                          </p>
                      )}

                      <input
                          className="w-full px-8 py-4 mt-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="tel"
                          placeholder="Mobile Number"
                          {...register("mobileNumber", {
                              required: "Mobile number is required", // Custom validation message
                              pattern: {
                                  value: /^[+]?[0-9]{10,15}$/, // Pattern for validating mobile number (10 to 15 digits)
                                  message: "Please enter a valid mobile number", // Custom validation message
                              },
                          })}
                      />
                      {/* Error Message */}
                      {errors.mobileNumber && (
                          <p className="text-red-500 text-sm mt-2">
                              {errors.mobileNumber.message}
                          </p>
                      )}

                      <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                              required: "Password is required",
                          })}
                      />
                      {errors.password && (
                          <p className="text-red-500 text-sm mt-2">
                              {errors.password.message}
                          </p>
                      )}
                      <button
                          type="submit"
                           className="mt-5 tracking-wide font-semibold bg-[#007E8F] text-white-500 w-full py-4 rounded-lg hover:bg-[#439ca8] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >    Add User
                      </button>
                  </div>
              </form>
      </main>  )
}

export default AddUser