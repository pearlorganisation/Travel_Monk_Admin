import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData, updateProfile } from '../../features/Actions/authAction';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { adminInfo } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = (data) => {
        dispatch(updateProfile(data));
        dispatch(getProfileData())
        setIsEditing(false);
    };

    useEffect(() => {
        dispatch(getProfileData());
    }, [dispatch]);

    useEffect(() => {
        if (adminInfo) {
            setValue('name', adminInfo.name);
            setValue('email', adminInfo.email);
        }
    }, [adminInfo, setValue]);

   
    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-500"
                    >
                        {isEditing ? 'Cancel' : 'Update Profile'}
                    </button>

                    <Link to={`/change-password`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-500"
                    >
                        Change Password
                    </Link>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Name Section */}
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Name</p>
                            {isEditing ? (
                                <input
                                    {...register('name')}
                                    className="w-full border rounded px-3 py-2"
                                    defaultValue={adminInfo?.name}
                                />
                            ) : (
                                <p className="text-lg font-semibold text-gray-900">{adminInfo?.name}</p>
                            )}
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            {isEditing ? (
                                <input
                                    {...register('email')}
                                    className="w-full border rounded px-3 py-2"
                                    defaultValue={adminInfo?.email}
                                />
                            ) : (
                                <p className="text-lg font-semibold text-gray-900">{adminInfo?.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Role Section */}
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Role</p>
                            <p className="text-lg font-semibold text-gray-900">{adminInfo?.role}</p>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
};

export default Profile;
