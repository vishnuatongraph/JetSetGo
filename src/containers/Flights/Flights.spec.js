import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Flights from "./Flights";

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockContextValue = {
  searchedFlights: [
    {
      id: 1,
      displayData: {
        airlines: [{ airlineName: "Test Airline" }],
        source: {
          depTime: "2024-02-08T10:30:00",
          airport: { cityCode: "ABC", cityName: "City ABC" },
        },
        destination: {
          arrTime: "2024-02-08T14:45:00",
          airport: { cityCode: "XYZ", cityName: "City XYZ" },
        },
        totalDuration: "4h 15m",
      },
      fare: 1000,
    },
  ],
};

describe("Flights Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <Flights navigation={mockNavigation} />,
      { wrapper: <Context.Provider value={mockContextValue} /> }
    );
    const backButton = getByText("Back");
    const headerText = getByText("JetSetGo");
    const filterPlaceholder = getByPlaceholderText("Filter By Airline");
    const priceFilterText = getByText("Price");
    const checkButton = getByText("Check");

    expect(backButton).toBeDefined();
    expect(headerText).toBeDefined();
    expect(filterPlaceholder).toBeDefined();
    expect(priceFilterText).toBeDefined();
    expect(checkButton).toBeDefined();
  });

  test("navigates back when Back button is pressed", () => {
    const { getByText } = render(<Flights navigation={mockNavigation} />, {
      wrapper: <Context.Provider value={mockContextValue} />,
    });
    const backButton = getByText("Back");
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  test("navigates to FlightDetails screen when Check button is pressed", () => {
    const { getByText } = render(<Flights navigation={mockNavigation} />, {
      wrapper: <Context.Provider value={mockContextValue} />,
    });
    const checkButton = getByText("Check");
    fireEvent.press(checkButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("FlightDetails", {
      flight: mockContextValue.searchedFlights[0],
    });
  });

  // Add more test cases as needed...
});
