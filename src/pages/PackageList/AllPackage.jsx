import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPackages } from '../../features/Actions/TripPackages/packageAction';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid2,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const AllPackage = () => {
    const dispatch = useDispatch();
    const { packageInfo } = useSelector((state) => state.packages);

    useEffect(() => {
        dispatch(getAllPackages());
    }, [dispatch]);

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
                {Array.isArray(packageInfo) && packageInfo?.map((pkg) => (
                    <Grid2
                        item
                        xs={12}
                        key={pkg._id}
                        className="w-full"
                    >
                        <Card className="h-full flex flex-col">
                            <CardMedia
                                component="img"
                                height="240"
                                image={pkg.banner.secure_url}
                                alt={pkg.name}
                                className="h-64 object-cover"
                            />

                            <CardContent className="flex-grow">
                                <Typography variant="h5" className="font-bold mb-2">
                                    {pkg.name}
                                </Typography>

                                <div className="flex items-center justify-between mb-4">
                                    <Chip
                                        label={`${pkg.duration.days} Days / ${pkg.duration.nights} Nights`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Typography variant="h6" color="primary" className="font-bold">
                                        ₹{pkg.startingPrice}
                                    </Typography>
                                </div>

                                <div className="mb-4">
                                    <Typography variant="subtitle1" className="font-semibold mb-2">
                                        Pickup & Drop
                                    </Typography>
                                    <Typography>
                                        {pkg.pickDropPoint.pickup} to {pkg.pickDropPoint.drop}
                                    </Typography>
                                </div>

                                <div className="mb-4">
                                    <Typography variant="subtitle1" className="font-semibold mb-2">
                                        Inclusions
                                    </Typography>
                                    <ul className="list-disc list-inside text-sm">
                                        {pkg.inclusions.map((inclusion, index) => (
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
                                        {renderItinerary(pkg.itinerary)}
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </main>

    );
}

export default AllPackage