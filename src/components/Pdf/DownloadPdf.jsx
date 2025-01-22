import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        backgroundColor: '#FAFAFA',
    },
    section: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 5,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#555',
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        lineHeight: 1.4,
        color: '#444',
    },
    activityList: {
        marginLeft: 15,
        fontSize: 12,
        marginBottom: 3,
        color: '#555',
    },
    smallText: {
        fontSize: 10,
        color: '#777',
    },
});

const FullyCustomizedEnquiriesPdf = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Package and Basic Details */}
            <View style={styles.section}>
                <Text style={styles.header}>Package Details</Text>
                <Text style={styles.text}>Package: {data.packageName}</Text>
                <Text style={styles.text}>Number of Travellers: {data.numberOfTravellers}</Text>
                <Text style={styles.text}>
                    Duration: {data.duration.days} days, {data.duration.nights} nights
                </Text>
                <Text style={styles.text}>
                    Travel Dates: {new Date(data.startDate).toLocaleDateString()} -{' '}
                    {new Date(data.endDate).toLocaleDateString()}
                </Text>
                <Text style={styles.text}>
                    Estimated Price: ₹{data.price.toLocaleString()}
                </Text>
            </View>

            {/* User Details */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>User Details</Text>
                <Text style={styles.text}>Name: {data.user.name}</Text>
                <Text style={styles.text}>Email: {data.user.email}</Text>
                <Text style={styles.text}>Mobile Number: {data.user.mobileNumber}</Text>
                <Text style={styles.text}>
                    User Created At: {new Date(data.user.createdAt).toLocaleString()}
                </Text>
            </View>

            {/* Itinerary */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Itinerary</Text>
                {data?.itinerary?.map((day, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.text}>
                            Day {day.day}-
                            {day.selectedLocation}
                        </Text>
                        <Text style={styles.text}>Hotel: {day?.selectedHotel?.name}</Text>
                        <Text style={styles.text}>Activities:</Text>
                        {day.selectedActivities.map((activity, idx) => (
                            <Text key={idx} style={styles.activityList}>
                                - {activity.label}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>
            {/** inclusions */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Inclusions</Text>
                {data?.inclusions?.map((inclusion,idx)=>(
                     <Text key={idx} style={styles.activityList}>
                         - {inclusion}
                     </Text>
                 ))}
            </View>
            {/** exclusions */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Exclusions</Text>
                {data?.exclusions?.map((exclusion, idx) => (
                    <Text key={idx} style={styles.activityList}>
                        - {exclusion}
                    </Text>
                ))}
            </View>
            {/* Vehicle Details */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>Vehicle Information</Text>
                <Text style={styles.text}>Selected Vehicle ID: {data?.selectedVehicle?.vehicleName}</Text>
                <Text style={styles.text}>Selected Vehicle Passenger Capacity: {data?.selectedVehicle?.passengerCapacity}</Text>
                <Text style={styles.text}>Selected Vehicle Luggage Capacity: {data?.selectedVehicle?.luggageCapacity}</Text>

            </View>

            {/* Metadata */}
            <View style={styles.section}>
                <Text style={styles.smallText}>
                    Enquiry Created At: {new Date(data.createdAt).toLocaleString()}
                </Text>
            </View>
        </Page>
    </Document>
);

const DownloadPdfButton = ({ data }) => 
{
    const { user } = data
    console.log("the user is", user)
    return (
    <PDFDownloadLink
        document={<FullyCustomizedEnquiriesPdf data={data} />}
        fileName={`${user.name}.pdf`}
    >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
    </PDFDownloadLink>
)};

export default DownloadPdfButton;
