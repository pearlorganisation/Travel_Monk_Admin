import React, { useEffect, useState } from 'react'
import { deletePackageById, getAllCustomPacakges } from '../../features/Actions/CustomPackage/customPackage'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import DownloadPdfButton from '../../components/Pdf/DownloadPdf'
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal'
const GetAllCustomPackage = () => {
   const dispatch = useDispatch()
   const { customPackagesData } = useSelector(state=> state.customPackages)
   const [packageId, setPackageId] = useState(null)
   const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
   const handleDelete=(id)=>{
    setPackageId(id)
    setIsDeleteModalOpen((!isDeleteModalOpen))
   }

   const confirmDelete = ()=>{
    dispatch(deletePackageById(packageId))
    dispatch(getAllCustomPacakges())
    setIsDeleteModalOpen(false)

   } 
   useEffect(()=>{
    dispatch(getAllCustomPacakges())
   },[dispatch])

    return (
    <main className="flex-1 p-8 mt-16 ml-64">
            <div> <h1 className='text-4xl font-bold mb-4'>Get All Custom Packages</h1> </div>
            <div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 rounded-s-lg">
                                Package Created For
                            </th>
                            <th scope="col" class="px-6 py-3 rounded-s-lg">
                                Package Name
                            </th>
                            
                            <th scope='col' class="px-6 py-3 rounded-s-lg">
                                Estimate Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(customPackagesData) && customPackagesData?.map((info) => (
                            <tr key={info._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {info?.user?.name}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {info?.packageName}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {info?.price}
                                </th>
                                <td className="px-6 py-4">
                                    <div className='flex gap-1'>
                                        <Button variant="outlined" color="error">
                                            <DownloadPdfButton data={info} />
                                        </Button>
                                        {/* <Button variant="outlined" color="primary" onClick={() => handleOpen(info)}>
                                            View Details
                                        </Button> */}
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(info?._id)}>
                                            Delete
                                        </Button>

                                        <Link to={`/update-custom-package/${info?._id}`} state={{ customPackage: info }}>
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
                            <th scope="row" class="px-6 py-3 text-base">Total Packages</th>
                            <td class="px-6 py-3">{customPackagesData.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {isDeleteModalOpen && <ConfirmDeleteModal confirmDelete={confirmDelete}  setShowDeleteModal={handleDelete} />}
    </main>
  )
}

export default GetAllCustomPackage