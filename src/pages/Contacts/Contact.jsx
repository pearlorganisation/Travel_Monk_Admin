import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNormalContact, getAllContacts } from '../../features/Actions/Contacts/contactAction';
import { Button } from '@mui/material';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';

export default function Contact() {
    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contact);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const handleDeleteOpen =(id)=>{
        setSelectedContactId(id)
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }
    const confirmDelete =()=>{
        dispatch(deleteNormalContact(selectedContactId))
        dispatch(getAllContacts())
        setIsDeleteModalOpen(false)
    }




    useEffect(() => {
        dispatch(getAllContacts());
    }, [dispatch]);

    const handleViewDetails = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <main className="flex-1 p-8 mt-16 ml-64 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Contacts</h1>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(contacts) && contacts?.map((contact) => (
                    <div
                        key={contact._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 "
                    >
                        <div className='flex justify-end'>
                            <Button variant="outlined" color="error" onClick={() => handleDeleteOpen(contact?._id)}>
                                Delete
                            </Button>
                        </div>
                         

                        <div className="space-y-4">
                            {/* Name */}
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-lg text-gray-800">{contact.name}</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-100 rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <span className="text-gray-600">{contact.email}</span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-100 rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <span className="text-gray-600">{contact.phoneNumber}</span>
                            </div>

                            <button
                                onClick={() => handleViewDetails(contact)}
                                className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {selectedContact && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Details</h2>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Name</label>
                                        <p className="text-lg font-semibold text-gray-800">{selectedContact.name}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-lg text-gray-800">{selectedContact.email}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Phone Number</label>
                                        <p className="text-lg text-gray-800">{selectedContact.phoneNumber}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Message</label>
                                        <p className="text-lg text-gray-800">{selectedContact.message}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Contacted At</label>
                                        <p className="text-lg text-gray-800">{formatDate(selectedContact.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/** delete Modal */}
            {isDeleteModalOpen && <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={handleDeleteOpen} />}
        </main>
    );
}