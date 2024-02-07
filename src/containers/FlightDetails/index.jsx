import { View, Image, Text, SafeAreaView, Pressable } from 'react-native';
import styles from "./styles"
import RupeesIcon from '../../assets/images/rupees.jpeg';
import flightdistancelogo from '../../assets/images/FlightDistancelogo.png';
export default function FlightDetails({ route }) {
    const flight = route.params.flight
    const dateTimeDeptString = flight?.displayData?.source?.depTime;
    const dateTimeArrString = flight?.displayData?.destination?.arrTime;
    const deptDateTime = new Date(dateTimeDeptString);
    const arrDateTime = new Date(dateTimeArrString);
    const hoursOfDept = deptDateTime.getHours();
    const hoursOfArr = arrDateTime.getHours();
    const minutesOfDept = deptDateTime.getMinutes();
    const minutesOfArr = arrDateTime.getMinutes();

    return <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.flightContainer}>
            <View style={styles.flightSubContainer}>
                <View style={styles.airlineNameContainer}>
                    <Text style={styles.alirlineName}>{flight?.displayData?.airlines[0]?.airlineName}</Text>
                </View>
            </View>
            <View style={[styles.flightSubContainer]}>
                <View >
                    <Text style={styles.arrDeptTime}>{hoursOfDept}.{minutesOfDept}</Text>
                    <Text style={styles.cityCode}>{flight?.displayData?.source?.airport?.cityCode}</Text>
                </View>
                <Image source={flightdistancelogo} style={{ alignSelf: 'baseline' }} />
                <View >
                    <Text style={[styles.arrDeptTime, { textAlign: 'right' }]}>{hoursOfArr}.{minutesOfArr}</Text>
                    <Text style={[styles.cityCode, { textAlign: 'right' }]}>{flight?.displayData?.destination?.airport?.cityCode}</Text>
                </View>
            </View>
            <View style={styles.airportnameContainer}>
                <Text style={styles.airportNameText}>{flight?.displayData?.source?.airport?.airportName}</Text>
                <Text style={[styles.airportNameText, { textAlign: 'right' }]}>{flight?.displayData?.destination?.airport?.airportName}</Text>
            </View>
            <View style={styles.fareContainer}>
                <Text style={styles.flightfareText}>Price: </Text>
                <Text style={styles.flightfarePriceText}><Image style={{ width: 20, height: 20 }} source={RupeesIcon} />{flight.fare}</Text>
            </View>
            <View>
                <Pressable style={styles.searchButton} onPress={() => null}><Text style={styles.searchText}>Confirm Booking</Text></Pressable>
            </View>
        </View>
    </SafeAreaView>
}