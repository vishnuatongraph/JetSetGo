import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";

import Flights from "./src/containers/Flights";
import FlightDetails from "./src/containers/FlightDetails";
import Search from "./src/containers/Search";
import api from "./src/services/api";

const Stack = createStackNavigator();
export const Context = React.createContext(null);

function App() {
  const [flights, setFlights] = useState([]);
  const [searchedFlights, setSearchedFlights] = useState([]);

  async function loadFlights() {
    const response = await api.get();
    setFlights(response.data.data.result);
  }
  useEffect(() => {
    loadFlights();
    SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Context.Provider
          value={{ flights, setFlights, searchedFlights, setSearchedFlights }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Flight"
              component={Flights}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FlightDetails"
              component={FlightDetails}
              options={{
                headerTitleAlign: "center",
                headerTitle: "Flight Details",
                headerBackgroundContainerStyle: { height: 65 },
              }}
            />
          </Stack.Navigator>
        </Context.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
