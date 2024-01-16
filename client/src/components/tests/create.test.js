import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect"; // Import the library extension
import Create from "../create";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ /* mock response data here */ }),
  })
);

test("creates a new user when the form is submitted", async () => {
  const { getByLabelText, getByText } = render(
    <Router>
      <Create />
    </Router>
  );

  // Mock form input data
  const nameInput = getByLabelText(/Name/i);
  const numberInput = getByLabelText(/Phone Number/i);
  const adminNoInput = getByLabelText(/Admin Number/i);

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(numberInput, { target: { value: "12345678" } });
  fireEvent.change(adminNoInput, { target: { value: "1234567X" } });

  // Mock the actual form submission
  fireEvent.submit(getByText(/Create User/i));

  // Wait for the asynchronous operation to complete (e.g., fetch)
  await waitFor(() => {
    // Check that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith("http://localhost:5050/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        number: "12345678",
        admin_no: "1234567X",
      }),
    });
  });

  // Now you can add additional assertions based on the expected behavior of your component after a successful post request
});