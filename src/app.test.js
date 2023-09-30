import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// // Mock the fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         count: 2,
//         results: [
//           { name: 'fake thing 1', url: 'http://fakethings.com/1' },
//           { name: 'fake thing 2', url: 'http://fakethings.com/2' },
//         ],
//       }),
//   })
// );

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders without crashing', () => {});

  it('initially displays loading as false', () => {
    const loadingText = screen.queryByText('Loading...');
    expect(loadingText).toBeNull();
  });

  test('test input field for url', async () => {
    const dummyUrl = 'http://saraIsAwesome.com';
    const formInput = screen.getByTestId('formInput');
    const goButton = screen.getByTestId('goButton');

    fireEvent.change(formInput, { target: { value: dummyUrl } });
    fireEvent.submit(goButton);
    const testValue = `URL: ${dummyUrl}`;
    const badTest = `URL: Pizza Rules`;
    // await screen.findByText(testValue);
    await waitFor(() => {
      expect(screen.queryByText(testValue)).toBeInTheDocument();
      expect(screen.queryByText(badTest)).not.toBeInTheDocument();
    });
  });
});
