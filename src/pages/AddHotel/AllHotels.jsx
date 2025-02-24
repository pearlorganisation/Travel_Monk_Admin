import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHotel, getAllHotels } from '../../features/Actions/Hotels/hotelsAction'
// import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid2,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Box,
    Modal
} from '@mui/material';
import { baseURL } from '../../services/axiosInterceptor'
import Pagination from '../../components/Pagination/Pagination'
const AllHotels = () => {
 const dispatch = useDispatch()
 const { hotelsData, paginate } = useSelector(state=> state.hotels);

  const [open, setOpen] = useState(false);
  const [hotelId , setHotelId] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedHotel,setSelectedHotel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  
  const TotalPage = Math.ceil(paginate?.total/paginate?.limit)
  const handlePageChange =(page)=>{
    if(page>0 && page <=TotalPage ){
        setCurrentPage(page)
    }
  }

  const deleteHandle = (id) => {
        setHotelId(id)
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const confirmDelete =()=>{
                dispatch(deleteHotel(hotelId))
                setIsDeleteModalOpen(!isDeleteModalOpen)
    }
          
    // handle for opening modal to show the details of 
    const handleOpen = (data) => {
        setSelectedHotel(data);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

useEffect(()=>{
      dispatch(getAllHotels({page:currentPage}))
 },[dispatch, currentPage])
    return (
    <main className="flex-1 p-8 mt-16 ml-64">
            <div className='text-4xl font-bold mb-4'>All Hotels</div>
            <div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 rounded-s-lg">
                                Hotel Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(hotelsData) && hotelsData?.map((info) => (
                            <tr key={info._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {info?.name}
                                </th>


                                <td className="px-6 py-4">
                                    <div className='flex gap-1'>
                                        <Button variant="outlined" color="primary" onClick={() => handleOpen(info)}>
                                            View Details
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => deleteHandle(info?._id)}>
                                            Delete
                                        </Button>
                                        <Link to={`/update-hotel/${info?._id}`} state={{ hotelData: info }}>
                                            <Button variant="outlined" color="error">
                                                Edit
                                            </Button>
                                        </Link>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr class="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" class="px-6 py-3 text-base">Total Hotels</th>
                            <td class="px-6 py-3">{paginate.total ??"N/A"}</td>
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
                        padding: 4,
                    }}
                >
                    {selectedHotel && (
                        <main className="flex-1 p-8 mt-16 ml-64">
                            <Typography variant="h4" className="mb-6 font-bold">
                                Hotel Information
                            </Typography>

                            <Grid2
                                container
                                spacing={4}
                                sx={{
                                    width: '100%',
                                }}
                                className="w-full"
                            >
                                {/* Image and Basic Information */}
                                <Grid2 item xs={12} className="w-full">
                                    <Card className="h-full flex flex-col">
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={`${baseURL}/${selectedHotel?.image?.path}`}
                                            alt={selectedHotel?.name}
                                            className="h-64 object-cover"
                                        />

                                        <CardContent className="flex-grow">
                                            <Typography variant="h5" className="font-bold mb-2">
                                                {selectedHotel?.name}
                                            </Typography>
                                            <Typography variant="h6" color="primary" className="font-bold mb-4">
                                                ₹{selectedHotel?.estimatedPrice}
                                            </Typography>

                                            {/* Location Details */}
                                            <div className="mb-4">
                                                <Typography variant="subtitle1" className="font-semibold mb-2">
                                                    Location
                                                </Typography>
                                                <Typography variant="body2" className="text-sm mb-1">
                                                    <strong>City:</strong> {selectedHotel?.city}
                                                </Typography>
                                                <Typography variant="body2" className="text-sm mb-1">
                                                    <strong>State:</strong> {selectedHotel?.state}
                                                </Typography>
                                                <Typography variant="body2" className="text-sm">
                                                    <strong>Country:</strong> {selectedHotel?.country}
                                                </Typography>
                                            </div>

                                            {/* Amenities */}
                                            <div className="mb-4">
                                                <Typography variant="subtitle1" className="font-semibold mb-2">
                                                    Amenities
                                                </Typography>
                                                <ul className="list-disc list-inside text-sm">
                                                    {selectedHotel?.amenities?.[0]?.split(',').map((amenity, index) => (
                                                        <li key={index} className="mb-1">
                                                            {amenity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid2>

                                {/* Google Maps and Dates */}
                                <Grid2 item xs={12} className="w-full">
                                    <Typography variant="subtitle1" className="font-semibold mb-2">
                                        Location Map
                                    </Typography>
                                    <div
                                        className="overflow-hidden rounded-md mb-4"
                                        dangerouslySetInnerHTML={{ __html: selectedHotel?.googleMapsUrl }}
                                    />

                                    <Typography variant="body2" className="text-sm text-gray-500">
                                        <strong>Created At:</strong> {new Date(selectedHotel?.createdAt).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" className="text-sm text-gray-500">
                                        <strong>Updated At:</strong> {new Date(selectedHotel?.updatedAt).toLocaleString()}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </main>
                    )}
                </Box>
            </Modal>
            {/**Pagination  */}
            <Pagination totalPages={TotalPage} currentPage={currentPage} paginate={paginate} handlePageClick={handlePageChange} />
            {/** delete modal */}
            {isDeleteModalOpen && <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={deleteHandle} />}                
    </main>
  )
}

export default AllHotels