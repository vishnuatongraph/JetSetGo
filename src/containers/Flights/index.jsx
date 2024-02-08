import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import logo from "../../assets/images/logo.png";
import flightdistancelogo from "../../assets/images/FlightDistancelogo.png";
import ArrowDownUp from "../../assets/images/ArrowsDownUp.png";
import Back from "../../assets/images/back.png";
import styles from "./styles";
import { CheckIcon, Select } from "native-base";
import RupeesIcon from "../../assets/images/rupees.jpeg";
import { Context } from "../../../App";

export default function Flights() {
  const navigation = useNavigation();
  const { searchedFlights } = useContext(Context);
  const [service, setService] = useState("");
  const [priceOrder, setPriceOrder] = useState("asc");
  const [fliteredFlight, setFilteredFlight] = useState([]);

  const getSelectData = useMemo(() => {
    return [
      ...new Set(
        searchedFlights.map(
          (flight) => flight?.displayData?.airlines[0]?.airlineName
        ) || []
      ),
    ];
  }, [searchedFlights]);

  const handleFlightDetails = (flight) => {
    navigation.navigate("FlightDetails", { flight });
  };

  useEffect(() => {
    setFilteredFlight(
      handleSortByPrice(
        fliteredFlight.length > 0 ? fliteredFlight : searchedFlights
      )
    );
  }, [priceOrder]);

  const handleSortByPrice = (data = []) => {
    if (priceOrder === "asc") {
      return [...(data || [])]?.sort((a, b) => a.fare - b.fare);
    } else {
      return [...(data || [])]?.sort((a, b) => b.fare - a.fare);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={Back}
              alt="back"
              style={{ height: 20, width: 20, marginRight: 10 }}
            />
            <Text>Back</Text>
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headerText}>JetSetGo</Text>
            <Image style={styles.logo} source={logo} />
          </View>
        </View>
        <View style={styles.headingContainer}>
          <Select
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Choose Airline"
            placeholder="Filter By Airline"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setService(itemValue);
              const filteredFlightsByService = searchedFlights?.filter(
                (item) =>
                  item?.displayData?.airlines[0]?.airlineName === itemValue
              );
              setFilteredFlight(filteredFlightsByService);
            }}
          >
            {getSelectData?.map((item) => {
              return <Select.Item label={item} value={item} key={item} />;
            })}
          </Select>
          <Pressable
            onPress={() => setPriceOrder(priceOrder === "asc" ? "desc" : "asc")}
            style={styles.priceSortContainer}
          >
            <Text style={styles.priceFilterText}>Price</Text>
            <Image style={{ height: 20, width: 20 }} source={ArrowDownUp} />
          </Pressable>
        </View>
        <FlatList
          style={styles.flightList}
          data={fliteredFlight.length > 0 ? fliteredFlight : searchedFlights}
          keyExtractor={(flight) => String(flight.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: flight }) => {
            const dateTimeDeptString = flight?.displayData?.source?.depTime;
            const dateTimeArrString = flight?.displayData?.destination?.arrTime;
            const deptDateTime = new Date(dateTimeDeptString);
            const arrDateTime = new Date(dateTimeArrString);
            const hoursOfDept = deptDateTime.getHours();
            const hoursOfArr = arrDateTime.getHours();
            const minutesOfDept = deptDateTime.getMinutes();
            const minutesOfArr = arrDateTime.getMinutes();

            return (
              <View style={styles.flightContainer} key={flight.id}>
                <View style={styles.flightSubContainer}>
                  <View style={styles.airlineContainer}>
                    <View style={styles.airlineNameContainer}>
                      <Text style={styles.alirlineName}>
                        {flight?.displayData?.airlines[0]?.airlineName}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.totalDuration}>
                    {flight?.displayData?.totalDuration}
                  </Text>
                </View>
                <View style={[styles.flightSubContainer, { marginTop: 15 }]}>
                  <View>
                    <Text style={styles.arrDeptTime}>
                      {hoursOfDept}.{minutesOfDept}
                    </Text>
                    <Text style={styles.cityCode}>
                      {flight?.displayData?.source?.airport?.cityCode} (
                      {flight?.displayData?.source?.airport?.cityName})
                    </Text>
                  </View>
                  <Image
                    source={flightdistancelogo}
                    style={{ alignSelf: "baseline", width: "40%" }}
                  />
                  <View>
                    <Text style={[styles.arrDeptTime, { textAlign: "right" }]}>
                      {hoursOfArr}.{minutesOfArr}
                    </Text>
                    <Text style={styles.cityCode}>
                      {flight?.displayData?.destination?.airport?.cityCode} (
                      {flight?.displayData?.destination?.airport?.cityName})
                    </Text>
                  </View>
                </View>
                <View style={styles.fareContainer}>
                  <Text style={styles.flightfareText}>Price: </Text>
                  <Text style={styles.flightfarePriceText}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={RupeesIcon}
                    />
                    {flight.fare}
                  </Text>
                </View>
                <View>
                  <Pressable
                    style={styles.searchButton}
                    onPress={() => handleFlightDetails(flight)}
                  >
                    <Text style={styles.searchText}>Check</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
