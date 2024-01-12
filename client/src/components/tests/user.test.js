import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import UserList from '../userList';

// Mock the fetch function
jest.mock('node-fetch');

test('renders user list with mock data', async () => {
  // Mock data for testing
  const mockUsers = [
    {
      _id: '1',
      name: 'Test User',
      number: '123456',
      admin_no: 'A12345',
    },
  ];

  // Mock the fetch function to resolve with the mock data
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockUsers),
    })
  );

  render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  );

  // Wait for the data to be loaded
  await waitFor(() => screen.getByText('Test User'),{timeout: 2000});

  // Check if the user is rendered
  expect(screen.getByText('Test User')).toBeInTheDocument();
  expect(screen.getByText('123456')).toBeInTheDocument();
  expect(screen.getByText('A12345')).toBeInTheDocument();
});

