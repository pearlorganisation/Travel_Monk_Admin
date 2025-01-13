import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHotel, getAllHotels } from '../../features/Actions/Hotels/hotelsAction'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal'

const AllHotels = () => {
 const dispatch = useDispatch()
 const { hotelsData } = useSelector(state=> state.hotels);

  const [open, setOpen] = useState(false);
  const [hotelId , setHotelId] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedVehicle,setSelectedVehicle] = useState(null);

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
        setSelectedVehicle(data);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

useEffect(()=>{
      dispatch(getAllHotels())
 },[])
    return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>AllHotels</div>
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
                            {/* <td class="px-6 py-3">{fullyCustomizedEnquiries.length}</td> */}
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/** delete modal */}
            {isDeleteModalOpen && <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={deleteHandle} />}                
    </main>
  )
}

export default AllHotels