import React, { useState, useMemo, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import logo from "../../assets/images/logo.png";
import styles from "../Flights/styles";
import { CheckIcon, Select } from "native-base";
import { Context } from "../../../App";

export default function Search() {
  const navigation = useNavigation();
  const { flights, setSearchedFlights } = useContext(Context);
  const [error, setError] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const getSource = useMemo(() => {
    return [
      ...new Set(
        flights.map(
          (flight) => flight?.displayData?.source?.airport?.cityName
        ) || []
      ),
    ];
  }, [flights]);

  const getDestination = useMemo(() => {
    return [
      ...new Set(
        flights.map(
          (flight) => flight?.displayData?.destination?.airport?.cityName
        ) || []
      ),
    ];
  }, [flights]);

  const handleSearch = () => {
    if (!selectedSource) return setError("Please select Source Location");
    if (!selectedDestination)
      return setError("Please select Destination Location");
    setSearchedFlights(
      flights?.filter(
        (flight) =>
          flight?.displayData?.source?.airport?.cityName === selectedSource &&
          flight?.displayData?.destination?.airport?.cityName ===
            selectedDestination
      )
    );
    navigation.navigate("Flight");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headerText}>JetSetGo</Text>
            <Image style={styles.logo} source={logo} />
          </View>
        </View>
        <View style={styles.subContainer}>
          <Select
            selectedValue={selectedSource}
            minWidth="200"
            accessibilityLabel="Choose Airline"
            placeholder="Choose Source"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setError("");
              setSelectedSource(itemValue);
            }}
          >
            {getSource?.map((item) => {
              return <Select.Item label={item} value={item} key={item} />;
            })}
          </Select>
          <Select
            selectedValue={selectedDestination}
            minWidth="200"
            accessibilityLabel="Choose Airline"
            placeholder="Choose Destination"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setError("");
              setSelectedDestination(itemValue);
            }}
          >
            {getDestination?.map((item) => {
              return <Select.Item label={item} value={item} key={item} />;
            })}
          </Select>
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "blue",
              borderRadius: 5,
              marginTop: 2,
            }}
            onPress={handleSearch}
          >
            <Text style={{ color: "#fff" }}>Search Flights</Text>
          </TouchableOpacity>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
