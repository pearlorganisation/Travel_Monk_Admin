import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { resetPassword } from '../../features/Actions/ForgotPassword/ForgotPasswordAction'

const ResetPassword = () => {
    const { token }  = useParams()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState:{errors}} = useForm()
    const submitForm = (data)=>{
        dispatch(resetPassword({ token, password: data.password }))
    }
  return (
      <section class="bg-gray-50 dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                  TRAVEL MONK
              </a>
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Enter your New Password
                      </h1>
                      <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitForm)}>
                          <div>
                              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Password</label>
                              <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New Password"
                                  {...register("password")}
                              />
                          </div>
                          <div class="flex items-center justify-between">
                              <div class="flex items-start">
                                  <div class="flex items-center h-5">
                                      <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                  </div>

                              </div>
                          </div>
                          <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Change Password</button>
                      </form>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default ResetPassword