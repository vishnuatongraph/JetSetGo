import React from "react";
import { render } from "@testing-library/react-native";
import FlightDetails from "./FlightDetails";

const mockRoute = {
  params: {
    flight: {
      displayData: {
        airlines: [{ airlineName: "JetSpice" }],
        source: {
          depTime: "2024-02-08T10:30:00",
          airport: { cityCode: "DEL", airportName: "Indira Gandhi Airport" },
        },
        destination: {
          arrTime: "2024-02-08T14:45:00",
          airport: { cityCode: "BOM", airportName: "Mumbai" },
        },
      },
      fare: 3840,
    },
  },
};

describe("FlightDetails Component", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <FlightDetails route={mockRoute} />
    );
    const airlineName = getByText("JetSpice");
    const sourceCityCode = getByText("DEL");
    const destinationCityCode = getByText("BOM");
    const sourceAirportName = getByText("Indira Gandhi Airport");
    const destinationAirportName = getByText("Mumbai");
    const priceText = getByText("Price:");
    const farePrice = getByText("3840");
    const confirmBookingButton = getByText("Confirm Booking");

    expect(airlineName).toBeDefined();
    expect(sourceCityCode).toBeDefined();
    expect(destinationCityCode).toBeDefined();
    expect(sourceAirportName).toBeDefined();
    expect(destinationAirportName).toBeDefined();
    expect(priceText).toBeDefined();
    expect(farePrice).toBeDefined();
    expect(confirmBookingButton).toBeDefined();
  });

  // Add more test cases as needed...
});
