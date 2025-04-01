import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePackage, getAllPackages } from '../../features/Actions/TripPackages/packageAction';
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
// import { Button, Stack, Modal, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import { Link } from 'react-router-dom';
import { baseURL } from '../../services/axiosInterceptor';
import Pagination from '../../components/Pagination/Pagination';
import { useForm } from 'react-hook-form';

const sortByPrice = [
    {
        id:1,
        value:"price-asc"
    },
    {
        id:2,
        value:"price-desc"
    }
]

const AllPackage = () => {
    const dispatch = useDispatch();
    const { packageInfo ,paginate} = useSelector((state) => state.packages);
    const [open, setOpen] = useState(false);
    const [packageId , setPackageId] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedPacakge,setSelectedPackage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const {register, watch} = useForm()
    const [sortBy, setSortBy] = useState("")
    /** handle for filtering by the price ascending or descending */
    const handleSortBy =(e)=>{
        setSortBy(e.target.value)
    }
console.log("sort by values are",sortBy)


    /** handles for changing the page */
    const TotalPage = Math.ceil(paginate.total/paginate.limit)
     
    const handlePageChange =(page)=>{
        if(page>0 && page <= TotalPage){
            setCurrentPage(page)
        }
    }


    const deleteHandle = (id) => {
        setPackageId(id)
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const confirmDelete =async()=>{
        try {
            await dispatch(deletePackage(packageId)).unwrap();  
            await dispatch(getAllPackages({ search: searchQuery ?? "", page: currentPage, sortBy: sortBy })).unwrap();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error during deletion or fetching packages:", error);
            return error
        }
        }

    const handleOpen = (enquiry) => {
        setSelectedPackage(enquiry);
        setOpen(true);
    };
     
    const searchQuery = watch("search")

    useEffect(() => {
         

        dispatch(getAllPackages({search:searchQuery??"",page:currentPage, sortBy:sortBy}));
    }, [dispatch, currentPage, searchQuery, sortBy]);

    // will use for the view details page
    const handleClose = () => setOpen(false);

    /**will use in future to show the details of the package */
    const renderItinerary = (itinerary) => (
        <div className="space-y-4">
            {Array.isArray(itinerary)&&itinerary?.map((day) => (
                <Accordion key={day._id} className="border border-gray-200 rounded-lg">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="bg-gray-100"
                    >
                        <Typography className="font-bold">
                            Day {day.day}: {day.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{day.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className='text-4xl font-bold mb-4'>All Packages</div>
            <div className='flex justify-start'>
                <form className='flex flex-row gap-3'>
                    <input
                        id="search"
                        type="text"
                        {...register("search")}
                        placeholder="Search Packages By Name"
                        className="w-72 h-12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                    />
                    <select className="px-4 h-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e)=> handleSortBy(e)}
                    >
                        <option value="">Select By Price</option>
                        {sortByPrice.map((option) => (
                            <option key={option.id} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                      
                </form>

            </div>
            <div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 rounded-s-lg">
                                Package Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(packageInfo) && packageInfo?.map((info) => (
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
                                        <Link to={`/update-package/${info?._id}`} state={{ packageData: info }}>
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
                            <td class="px-6 py-3">{paginate?.total}</td>
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
                    {selectedPacakge &&(
                        <main className="flex-1 p-8 mt-16 ml-64">
                            <Typography variant="h4" className="mb-6 font-bold">
                                Our Packages
                            </Typography>

                            <Grid2
                                container
                                spacing={4}
                                sx={{
                                    width: "100%", // Ensure the grid takes up full width
                                }}
                                className="w-full"
                            >
                               
                                    <Grid2
                                        item
                                        xs={12}
                                        key={selectedPacakge._id}
                                        className="w-full"
                                    >
                                        <Card className="h-full flex flex-col">
                                            <CardMedia
                                                component="img"
                                                height="240"
                                            image={`${baseURL}/${selectedPacakge?.image?.path}`}
                                            alt={selectedPacakge.name}
                                                className="h-64 object-cover"
                                            />

                                            <CardContent className="flex-grow">
                                                <Typography variant="h5" className="font-bold mb-2">
                                                {selectedPacakge?.name}
                                                </Typography>

                                                <div className="flex items-center justify-between mb-4">
                                                    <Chip
                                                    label={`${selectedPacakge?.duration?.days} Days / ${selectedPacakge?.duration?.nights} Nights`}
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                    <Typography variant="h6" color="primary" className="font-bold">
                                                    ₹{selectedPacakge?.startingPrice}
                                                    </Typography>
                                                </div>

                                                <div className="mb-4">
                                                    <Typography variant="subtitle1" className="font-semibold mb-2">
                                                        Pickup & Drop
                                                    </Typography>
                                                    <Typography>
                                                    {selectedPacakge?.pickDropPoint?.pickup} to {selectedPacakge?.pickDropPoint?.drop}
                                                    </Typography>
                                                </div>

                                                <div className="mb-4">
                                                    <Typography variant="subtitle1" className="font-semibold mb-2">
                                                        Inclusions
                                                    </Typography>
                                                    <ul className="list-disc list-inside text-sm">
                                                    {selectedPacakge?.inclusions?.map((inclusion, index) => (
                                                            <li key={index} className="mb-1">{inclusion}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        className="bg-gray-100 rounded"
                                                    >
                                                        <Typography className="font-semibold">
                                                            Detailed Itinerary
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                    {renderItinerary(selectedPacakge.itinerary)}
                                                    </AccordionDetails>
                                                </Accordion>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                             
                            </Grid2>
                        </main>
                    )}
                </Box>
                </Modal>
            {isDeleteModalOpen && <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={deleteHandle} /> }   
            <Pagination paginate={paginate} currentPage={currentPage} totalPages={TotalPage} handlePageClick={handlePageChange} />             
        </main>
    );
}

export default AllPackage