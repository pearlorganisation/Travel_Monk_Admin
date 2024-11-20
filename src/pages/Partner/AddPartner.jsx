import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createPartner } from '../../features/Actions/Partner/AddPartnerAction/addPartnerAction';

const AddPartner = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { partner_type } = useSelector((state) => state.partnertype);

    // useEffect(() => {
    //     dispatch(getPartnerType());
    // }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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

    const onSubmit = (data) => {
        const formData = { ...data, partnerLogo: image };
        dispatch(createPartner(formData));
        closeModal();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Add Partner</h2>
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
                    <input
                        type="file"
                        id="partnerLogo"
                        accept="image/*"
                        {...register("partnerLogo", { required: "Partner Logo is required" })}
                        onChange={handleImageChange}
                        className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.partnerLogo ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="h-40 w-auto mt-4 rounded-md shadow-md" />}
                </div>
                <div className='flex justify-between'>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create Partner
                    </button>
                    <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddPartner

 
 