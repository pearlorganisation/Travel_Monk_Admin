import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../features/Actions/Bookings/bookingsAction'
import { Link } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid2, Modal, Typography } from '@mui/material'
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal'
import Pagination from '../../components/Modal/PaginationComponent'
 
const Bookings = () => {
  const dispatch = useDispatch()
  const { bookingsData, paginate } = useSelector(state=>state.bookings)
  const [ currentPage, setCurrentPage] = useState(1)   
  const [open,setOpen] = useState(false)
  const [bookingId,setBookingId] = useState(null)
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  
  const totalPages = Math.ceil(paginate?.total/paginate?.limit)
  console.log("the total pages", totalPages)

  const handlePageClick = (page) => {
    console.log(page, "current page");
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleOpen=(data)=>{
    setSelectedBooking(data)
    setOpen(true)
  }

  const handleClose=()=>{
    setOpen(false)
  }
  useEffect(()=>{
     dispatch(getAllBookings({page:currentPage}))
  },[currentPage])

  return (
   <main className="flex-1 p-8 mt-16 ml-64">
     <div>Bookings</div>
      <div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 rounded-s-lg">
                Booking Id
              </th>
              <th>
                Person Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookingsData) && bookingsData?.map((info) => (
              <tr key={info._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {info?.bookingId}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {info?.user?.name}
                </th>


                <td className="px-6 py-4">
                  <div className='flex gap-1'>
                    <Button variant="outlined" color="primary" onClick={() => handleOpen(info)}>
                      View Details
                    </Button>
                    {/* <Button variant="outlined" color="error" onClick={() => deleteHandle(info?._id)}>
                      Delete
                    </Button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">Total Bookings</th>
               
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
          {selectedBooking && (
            <main className="flex-1 p-8">
              <Typography variant="h4" className="mb-6 font-bold text-gray-800">
                Booking Details
              </Typography>

              <Grid2 container spacing={4} className="w-full">
                {/* Booking Information */}
                <Grid2 item xs={12}>
                  <Card className="h-full">
                    <CardContent>
                      <Typography variant="h6" className="font-bold mb-4 text-gray-700">
                        Basic Information
                      </Typography>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Booking ID:</p>
                          <p className="text-gray-600">{selectedBooking.bookingId}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Status:</p>
                          <p className="text-gray-600">{selectedBooking.bookingStatus}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid2>

                {/* User Information */}
                <Grid2 item xs={12}>
                  <Card className="h-full">
                    <CardContent>
                      <Typography variant="h6" className="font-bold mb-4 text-gray-700">
                        Customer Details
                      </Typography>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Name:</p>
                          <p className="text-gray-600">{selectedBooking.user.name}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Email:</p>
                          <p className="text-gray-600">{selectedBooking.user.email}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Mobile:</p>
                          <p className="text-gray-600">{selectedBooking.user.mobileNumber}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid2>

                {/* Package Details */}
                <Grid2 item xs={12}>
                  <Card className="h-full">
                    <CardContent>
                      <Typography variant="h6" className="font-bold mb-4 text-gray-700">
                        Package Details
                      </Typography>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold">Package Name:</p>
                          <p className="text-gray-600">{selectedBooking?.packageId?.name}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Duration:</p>
                          <p className="text-gray-600">
                            {selectedBooking.packageId.duration.days} Days - {selectedBooking?.packageId?.duration?.nights} Nights
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">Pick-up/Drop:</p>
                          <p className="text-gray-600">
                            {selectedBooking?.packageId?.pickDropPoint?.pickup} to {selectedBooking?.packageId?.pickDropPoint?.drop}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid2>

                {/* Payment Information */}
                <Grid2 item xs={12}>
                  <Card className="h-full">
                    <CardContent>
                      <Typography variant="h6" className="font-bold mb-4 text-gray-700">
                        Payment Details
                      </Typography>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Total Price:</p>
                          <p className="text-gray-600">₹{selectedBooking?.totalPrice}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Payment Status:</p>
                          <p className="text-gray-600">{selectedBooking?.paymentStatus}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Order ID:</p>
                          <p className="text-gray-600">{selectedBooking?.razorpay_order_id}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Number of Travelers:</p>
                          <p className="text-gray-600">{selectedBooking?.numberOfTravellers}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>
            </main>
          )}
        </Box>
      </Modal>
      {/** pagination component */}
       <Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
   </main>
  )
}

export default Bookings