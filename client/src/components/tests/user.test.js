import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import UserList from '../userList';
const mockUser = {
  _id: '123',
  name: 'John Doe',
  number: '1234567890',
  admin_no: '1001',
};

test('renders UserList component without errors', () => {
  render(<UserList />);
  const headerElement = screen.getByText(/User List/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders UserList component with a user', () => {
  // Render the component with mocked users data
  render(<UserList users={[mockUser]} />);

  // Check for the presence of the specific user data
  const userRow = screen.getByText(/John Doe/i);
  const userNumber = screen.getByText(/1234567890/i);
  const userAdminNo = screen.getByText(/1001/i);

  // Ensure all user elements are rendered
  expect(userRow).toBeInTheDocument();
  expect(userNumber).toBeInTheDocument();
  expect(userAdminNo).toBeInTheDocument();
});