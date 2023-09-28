// import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better matchers
import Form from './index'; // Import the Form component

test('renders the form with initial values', () => {
  // Render the Form component
  const { getByLabelText, getByText } = render(Form);

  // Check if the form elements are rendered with initial values
  expect(getByLabelText('URL:')).toBeInTheDocument();
  expect(getByText('GO!')).toBeInTheDocument();
  expect(getByLabelText('Request Body (JSON):')).toBeInTheDocument();
  expect(screen.getByText('GET')).toHaveClass('active');
});

test('updates form state on input change', () => {
  const { getByLabelText } = render(Form);
  const urlInput = getByLabelText('URL:');
  const requestBodyInput = getByLabelText('Request Body (JSON):');

  fireEvent.change(urlInput, { target: { value: 'https://example.com/api' } });
  fireEvent.change(requestBodyInput, { target: { value: '{"key": "value"}' } });

  // Check if the form fields have been updated
  expect(urlInput).toHaveValue('https://example.com/api');
  expect(requestBodyInput).toHaveValue('{"key": "value"}');
});
