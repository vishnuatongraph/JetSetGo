import React from "react";
import { render, fireEvent, expect } from "@testing-library/jest-native";
import Search from "./Search";

describe("Search Component", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Search />);
    const headerText = getByText("JetSetGo");
    const sourcePlaceholder = getByPlaceholderText("Choose Source");
    const destinationPlaceholder = getByPlaceholderText("Choose Destination");
    const searchButton = getByText("Search Flights");

    expect(headerText).toBeDefined();
    expect(sourcePlaceholder).toBeDefined();
    expect(destinationPlaceholder).toBeDefined();
    expect(searchButton).toBeDefined();
  });

  test("displays error when source is not selected", () => {
    const { getByText } = render(<Search />);
    const searchButton = getByText("Search Flights");
    fireEvent.press(searchButton);
    const errorText = getByText("Please select Source Location");

    expect(errorText).toBeDefined();
  });

  test("displays error when destination is not selected", () => {
    const { getByText, getByPlaceholderText } = render(<Search />);
    const sourcePlaceholder = getByPlaceholderText("Choose Source");
    fireEvent(sourcePlaceholder, "onValueChange", "New York");
    const searchButton = getByText("Search Flights");
    fireEvent.press(searchButton);
    const errorText = getByText("Please select Destination Location");

    expect(errorText).toBeDefined();
  });

  test("searches for flights when both source and destination are selected", () => {
    const mockedSetSearchedFlights = jest.fn();
    const mockedNavigation = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText } = render(
      <Search navigation={mockedNavigation} />
    );
    const sourcePlaceholder = getByPlaceholderText("Choose Source");
    const destinationPlaceholder = getByPlaceholderText("Choose Destination");
    fireEvent(sourcePlaceholder, "onValueChange", "JetSpice");
    fireEvent(destinationPlaceholder, "onValueChange", "Air India");
    const searchButton = getByText("Search Flights");
    fireEvent.press(searchButton);

    expect(mockedSetSearchedFlights).toHaveBeenCalled();
    expect(mockedNavigation.navigate).toHaveBeenCalledWith("Flight");
  });
});
