import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()

import Form from './Form';

// Mock the props and API call function
const mockProps = {
  callApi: jest.fn(),
};

describe('Form Component', () => {
  it('renders the form elements', () => {
    const { getByLabelText, getByText } = render(<Form {...mockProps} />);

    // Check if form elements are present
    expect(getByLabelText('URL:')).toBeInTheDocument();
    expect(getByText('GO!')).toBeInTheDocument();
    expect(getByLabelText('Request Body (JSON):')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    const { getByLabelText } = render(<Form {...mockProps} />);
    const urlInput = getByLabelText('URL:');
    const requestBodyInput = getByLabelText('Request Body (JSON):');

    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    fireEvent.change(requestBodyInput, { target: { value: '{"key": "value"}' } });

    expect(urlInput).toHaveValue('https://example.com');
    expect(requestBodyInput).toHaveValue('{"key": "value"}');
  });

  it('handles method selection', () => {
    const { getByText } = render(<Form {...mockProps} />);
    const postButton = getByText('POST');

    fireEvent.click(postButton);

    // Check if the POST button is active
    expect(postButton).toHaveClass('active');
  });

  it('submits the form', async () => {
    const { getByLabelText, getByText } = render(<Form {...mockProps} />);
    const urlInput = getByLabelText('URL:');
    const goButton = getByText('GO!');

    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    fireEvent.click(goButton);

    // Wait for the loading message to disappear
    await waitFor(() => {
      expect(mockProps.callApi).toHaveBeenCalledTimes(1); // Ensure the API function is called
    });
  });
});