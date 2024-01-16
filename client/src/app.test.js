import React from "react";
import { render, fireEvent, waitFor , screen} from "@testing-library/react";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import App from "./App";
import Create from "./components/create";
import "@testing-library/jest-dom/extend-expect"; // Import the library extension
test("renders App component with Navbar", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if Navbar is rendered
  const navbarElement = screen.getByRole("navigation");
  expect(navbarElement).toBeInTheDocument();
});

test("renders UserList component by default", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if UserList component is rendered by default
  const userListElement = screen.getByText(/Member List/i);
  expect(userListElement).toBeInTheDocument();
});

test("navigates to Create component when 'Create User' link is clicked", async () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Click the 'Create User' link
  fireEvent.click(screen.getByText(/Create User/i));

  // Wait for the asynchronous navigation to complete
  await waitFor(() => {
    // Check if Create component is rendered
    const createPageElement = screen.getByText(/Create New User/i);
    expect(createPageElement).toBeInTheDocument();
  });
});

// Add more tests based on the interactions and UI elements in your application
// For example, you can test the rendering of Edit component, deleting a user, etc.