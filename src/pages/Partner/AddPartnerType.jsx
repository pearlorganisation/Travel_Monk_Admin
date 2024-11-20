import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { createPartnerType } from '../../features/Actions/Partner/partnerTypeAction';

const AddPartnerType = ({ closeModal }) => {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const submitForm = (data) => {
        dispatch(createPartnerType(data))
    }
    return (
        <div>
            <div className="text-4xl font-bold mb-4">Add Partner Type</div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-4">
                    <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Partner Type</label>
                    <input
                        type="text"
                        id="partnerTypeName"
                        {...register("partnerTypeName")}
                        className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.partnerTypeName && <p className="text-red-500 text-sm mt-1">{errors.partnerTypeName.message}</p>}
                </div>
                <div className='flex justify-between'>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Partner
                    </button>
                    <button onClick={closeModal}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>

                </div>

            </form>
        </div>
    )
}

export default AddPartnerType