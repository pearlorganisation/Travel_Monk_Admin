import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLocationById, getAllLocations } from '../../features/Actions/Location/locationAction'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal'
import Pagination from '../../components/Pagination/Pagination'
import { useDebounce } from '../../components/DebounceHook/debounceHook'

const AllLocation = () => {
  const dispatch = useDispatch()
  const { allLocations, paginate }= useSelector(state=> state.location)
  const [currentPage,setCurrentPage] = useState(1);
  const [locationId,setLocationId] = useState(null)
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
  const [open,setOpen] = useState(false)
  const [selectedLocation,setSelectedLocation] = useState(null)

  /** for searching */
  const [searchQuery, setSearchQuery] = useState("")
  const handleChangeQuery=(e)=>{
    setSearchQuery(e.target.value)
  }
  console.log("the searching query is", searchQuery)

  const debouncedSearchQuery = useDebounce(searchQuery,500)
  console.log("the returned search query after the debouncing", debouncedSearchQuery);

  const TotalPage = Math.ceil(paginate?.total/paginate?.limit)
  
  const handlePageChange =(page)=>{
    if(page >0 && page <=TotalPage){
        setCurrentPage(page)
    }
  }

  /**delete handle*/
  const deleteHandle =(id)=>{
    setLocationId(id)
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }
 
  /**to confirm the delete  */
  const confirmDelete =()=>{
      dispatch(deleteLocationById(locationId))
      setIsDeleteModalOpen(false)
  }

  /**handle open */
  const handleOpen = (data)=>{
    setSelectedLocation(data)
    setOpen(true)
  }

  /**handle close */

  const handleClose=()=>{
    setOpen(false)
  }


  useEffect(()=>{
   dispatch(getAllLocations({page:currentPage, search:debouncedSearchQuery}))
  },[currentPage, debouncedSearchQuery])

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
          <div className='text-4xl font-bold mb-4'>All Location</div>
          <div className='mb-2 flex flex-col items-start rounded-sm'>
              <label htmlFor='search' className='mb-1'>Search the location</label>
              <input
                  type='text'
                  id='search'
                  className='w-64 px-3 py-2 border border-gray-300 rounded-sm'
                  onChange={(e) => handleChangeQuery(e)}
              />
          </div>

          <div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3 rounded-s-lg">
                            Day
                          </th>
                          <th scope="col" class="px-6 py-3 rounded-s-lg">
                              Destination Name
                          </th>
                          <th scope="col" class="px-6 py-3 rounded-s-lg">
                             Available Locations
                          </th>
                          <th scope="col" className="flex justify-center items-center rounded-s-lg">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {Array.isArray(allLocations) && allLocations?.map((info) => (
                          <tr key={info._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50">

                              <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                  {info?.day}
                              </th>
                              <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                  {info?.destination?.name}
                              </th>

                              <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                  <ul>
                                      {info?.location?.map((item) => (
                                          <li key={item._id}>{item?.name},</li>
                                      ))}
                                  </ul>
                              </th>
                              <td className="px-6 py-4">
                                  <div className='flex justify-center items-center gap-1'>
                                      {/* <Button variant="outlined" color="primary" onClick={() => handleOpen(info)}>
                                          View Details
                                      </Button> */}
                                      <Button variant="outlined" color="error" onClick={() => deleteHandle(info?._id)}>
                                          Delete
                                      </Button>
                                      <Link to={`/update-location/${info?._id}`} state={{ locationData: info }}>
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
                          <th scope="row" class="px-6 py-3 text-base">Total Locations</th>
                          <td class="px</div>-6 py-3">{paginate?.total ??"N/A"}</td>
                      </tr>
                  </tfoot>
              </table>
          </div>
          {/** pagination component */}
          <Pagination paginate={paginate} currentPage={currentPage} totalPages={TotalPage} handlePageClick={handlePageChange} />
          {/** delete modal */}
          {isDeleteModalOpen && <ConfirmDeleteModal setShowDeleteModal={deleteHandle} confirmDelete={confirmDelete} />}
    </main>
  )
}

export default AllLocation