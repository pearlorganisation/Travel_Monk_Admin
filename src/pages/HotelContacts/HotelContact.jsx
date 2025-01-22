import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHotelContact, getAllHotelContacts } from '../../features/Actions/Hotels/hotelContactsAction'
import { Box, Button, Modal } from '@mui/material'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Modal/PaginationComponent'
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal'
import { format } from 'date-fns';
import { MapPin, Calendar, Users, Mail, Phone } from 'lucide-react';
import { baseURL } from '../../services/axiosInterceptor'
const HotelContact = () => {
    const dispatch = useDispatch()
    const { contactsHotel, paginate } = useSelector(state => state.hotelcontactsData)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [open, setOpen] = useState(false)
    const [contactId, setContactId] = useState(false);
    const [contactInfo, setContactInfo] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen]= useState(false)

    const deleteHandle =(id)=>{
        setContactId(id);
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }
    const confirmDelete=()=>{
        // will add delete function later
        dispatch(deleteHotelContact(contactId)).then(()=>{
            dispatch(getAllHotelContacts({ page: currentPage }));
            setIsDeleteModalOpen(!isDeleteModalOpen)
        }
        )
     }
    const handleOpen=(data)=>{
        setContactInfo(data)
        setOpen(true)
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    const totalPage = Math.ceil(paginate?.total/paginate?.limit)

    const handlePageClick =(page)=>{
        if(page>0 && page <= totalPage){
            setCurrentPage(page)
        }
    }

   
    useEffect(()=>{
        dispatch(getAllHotelContacts({page:currentPage}))
    },[dispatch, currentPage])
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
          <div className='text-4xl font-bold mb-4'>Hotel Contact</div>
          <div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3 rounded-s-lg">
                              Contacting Person Name
                          </th>
                          <th scope="col" class="px-6 py-3 rounded-s-lg">
                              Hotel Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {Array.isArray(contactsHotel) && contactsHotel?.map((info) => (
                          <tr key={info._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50">

                              <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                  {info?.name}
                              </th>
                              
                              
                              <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                  {info?.hotel?.name}
                              </th>


                              <td className="px-6 py-4">
                                  <div className='flex gap-1'>
                                      <Button variant="outlined" color="primary" onClick={() => handleOpen(info)}>
                                          View Details
                                      </Button>
                                      <Button variant="outlined" color="error" onClick={() => deleteHandle(info?._id)}>
                                          Delete
                                      </Button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
                  <tfoot>
                      <tr class="font-semibold text-gray-900 dark:text-white">
                          <th scope="row" class="px-6 py-3 text-base">Total Contacts</th>
                          <td class="px-6 py-3">{paginate?.total}</td>
                      </tr>
                  </tfoot>
              </table>
          </div>
          <Pagination currentPage={currentPage} paginate={paginate} totalPages={totalPage} handlePageClick={handlePageClick}  />
           
           {/** details section */}
           <Modal open={open} onClose={handleClose}>
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg outline-none overflow-y-auto"
                  sx={{
                      width: 800,
                      maxHeight: '80vh',
                      padding: 4
                  }}>
                 {contactInfo && <BookingDetailsModal contactInfo={contactInfo} />}
             </Box>
           </Modal>
          {isDeleteModalOpen && <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={deleteHandle} />}
    </main>
  )
}

export default HotelContact




const BookingDetailsModal = ({contactInfo}) => {
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMM dd, yyyy');
    };

    return (
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg">
            {/* Header Section */}
            <div className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold mb-2">Contact Info Details</h2>
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{contactInfo?.hotel?.city}, {contactInfo?.hotel?.state}, {contactInfo?.hotel?.country}</span>
                </div>
            </div>

            {/* Guest Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Guest Information</h3>
                    <div className="space-y-2">
                        <p className="flex items-center">
                            <span className="font-medium w-24">Name:</span>
                            {contactInfo?.name}
                        </p>
                        <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {contactInfo?.email}
                        </p>
                        <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {contactInfo?.phoneNumber}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Stay Details</h3>
                    <div className="space-y-2">
                        <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Check-in: {formatDate(contactInfo?.checkIn)}
                        </p>
                        <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Check-out: {formatDate(contactInfo?.checkOut)}
                        </p>
                        <p className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Guests: {contactInfo?.numberOfPersons}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hotel Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hotel Details</h3>
                <div className="flex items-start space-x-4">
                    <img
                        src={`${baseURL}/${contactInfo?.hotel?.image?.path}`}
                        alt={contactInfo?.hotel?.name}
                        className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="space-y-2">
                        <h4 className="text-xl font-medium">{contactInfo?.hotel?.name}</h4>
                        <p className="text-gray-600">Estimated Price: ₹{contactInfo?.hotel?.estimatedPrice}</p>
                        <div className="flex flex-wrap gap-2">
                            {contactInfo?.hotel?.amenities?.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Maps */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                <div
                    className="w-full h-64 rounded-lg overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: contactInfo.hotel.googleMapsUrl }}
                />
            </div>
        </div>
    );
};