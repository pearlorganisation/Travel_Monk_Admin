import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePrebuiltEnquiry, getPreBuiltPackageCustomisationEnquiries } from '../../features/Actions/CustomizationEnquiries/customisationEnquiriesAction'
import { Button, Stack, Modal, Typography, Box } from '@mui/material';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import Pagination from '../../components/Modal/PaginationComponent';
const PreBuiltCustomisationEnquiries = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [enquiryId, setEnquiryId] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)


    const { prebuiltPackageEnquiries, prebuiltPagination } = useSelector((state) => state.enquiries)
    /**-------for managing current page--------------*/
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        prebuiltPagination?.total / prebuiltPagination?.limit
    )
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const deleteHandle =(id)=>{
         setEnquiryId(id)
        setIsDeleteModalOpen(!isDeleteModalOpen)
       
    }
    const confirmDelete =()=>{
        dispatch(deletePrebuiltEnquiry(enquiryId))
        setIsDeleteModalOpen(!isDeleteModalOpen)
        dispatch(getPreBuiltPackageCustomisationEnquiries({page:currentPage}))
    }
    const handleOpen = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setOpen(true);
    };


    const handleClose = () => setOpen(false);
 
    useEffect(()=>{
        dispatch(getPreBuiltPackageCustomisationEnquiries({ page: currentPage }))
    },[dispatch, currentPage])
  return (
      <main className="flex-1 p-8 mt-16 ml-64">
          <div className='text-4xl font-bold mb-4'>Prebuilt Package Customisation Enquiries</div>
          <div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3 rounded-s-lg">
                              User Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Email
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Mobile Number
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {Array.isArray(prebuiltPackageEnquiries) && prebuiltPackageEnquiries?.map((info) => (
                          <tr key={info._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50">
                              <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                  {info?.name}
                              </th>
                              <td className="px-6 py-4">
                                  <a href={`mailto:${info?.email}`} className="underline text-blue-600 hover:text-blue-800">  {/* Styling with Tailwind */}
                                      {info?.email}
                                  </a>
                              </td>
                              <td className="px-6 py-4">{info?.mobileNumber}</td>
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
                          <th scope="row" class="px-6 py-3 text-base">Total Enquiries</th>
                          <td class="px-6 py-3">{prebuiltPackageEnquiries.length ?? "N/A"}</td>
                      </tr>
                  </tfoot>
              </table>
          </div>
          <Modal open={open} onClose={handleClose}>
              <Box
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg outline-none overflow-y-auto"
                  sx={{
                      width: 800,  
                      maxHeight: '80vh',  
                      padding: 4
                  }}
              >
                  {selectedEnquiry && (
                      <div className="p-4">
                          <Typography variant="h6" component="h2" id="modal-modal-title">
                              Enquiry Details
                          </Typography>
                          <div className="max-h-[60vh] overflow-y-auto pr-4"> {/* Scrollable content container */}
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                  <strong>User Name:</strong> {selectedEnquiry?.name}<br />
                                  <strong>Email:</strong> {selectedEnquiry?.email}<br />
                                  <strong>Mobile Number:</strong> {selectedEnquiry?.mobileNumber}<br />
                                  <strong>Package Name:</strong> {selectedEnquiry?.package?.name}<br />
                                  <strong>Number of Travellers:</strong> {selectedEnquiry?.numberOfTravellers}<br />
                                  <strong>Estimated Price:</strong> {selectedEnquiry?.estimatedPrice}<br />
                                  <strong>Vehicle Name:</strong> {selectedEnquiry?.selectedVehicle?.name}<br />
                                  <strong>Message:</strong> {selectedEnquiry?.message}<br />

                              </Typography>

                              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>Itinerary:</Typography>
                              {selectedEnquiry?.itinerary?.map((day) => (
                                  <div key={day._id} className="mb-4">
                                      <Typography><strong>Day {day?.day}: {day?.location}</strong></Typography>
                                      <Typography>Selected Hotel: {day?.selectedHotel?.name}</Typography>
                                      {day?.selectedActivities && day?.selectedActivities?.length > 0 && (
                                          <Typography>Selected Activities: </Typography>
                                      )}
                                      {day?.selectedActivities && day?.selectedActivities.map((act, index) => (
                                          <div key={act?.value._id}>{index + 1}. {act?.value?.name}</div>
                                      ))}
                                  </div>
                              ))}
                          </div>

                          <Button
                              onClick={handleClose}
                              variant="contained"
                              color="primary"
                              className='mt-4 w-full'
                          >
                              Close
                          </Button>
                      </div>
                  )}
              </Box>
          </Modal>

          {isDeleteModalOpen && 
              <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={deleteHandle} />
          }
          <Pagination paginate={prebuiltPagination} currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageChange} />

      </main>
 
  )
}

export default PreBuiltCustomisationEnquiries