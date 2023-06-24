import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should format the first four phone number input correctly', () => {
    render(<App />);
    const phoneInput = screen.getByPlaceholderText('mobile number');

    // Simulate typing the phone number
    fireEvent.change(phoneInput, { target: { value: '1234' } });
    expect(phoneInput.value).toBe('(123) 4');

  });

  it('should format the first five phone number input correctly', () => {
    render(<App />);
    const phoneInput = screen.getByPlaceholderText('mobile number');

    // Simulate typing the phone number
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    expect(phoneInput.value).toBe('(123) 45');

  });

  it('should format the first ten phone number input correctly', () => {
    render(<App />);
    const phoneInput = screen.getByPlaceholderText('mobile number');

    // Simulate typing the phone number
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    expect(phoneInput.value).toBe('(123) 456-7890');
  });

  it('should not take more than ten digits', () => {
    render(<App />);
    const phoneInput = screen.getByPlaceholderText('mobile number');

    // Simulate typing the phone number
    fireEvent.change(phoneInput, { target: { value: '12345678901234' } });
    expect(phoneInput.value).toBe('(123) 456-7890');
  });

  it('should not allow non-digit characters in the input', () => {
    render(<App />);
    const phoneInput = screen.getByPlaceholderText('mobile number');;

    fireEvent.change(phoneInput, { target: { value: 'abc1234' } });
    expect(phoneInput.value).toBe('(123) 4');

    fireEvent.change(phoneInput, { target: { value: '12#$%34567' } });
    expect(phoneInput.value).toBe('(123) 456-7');
  });

  it('should maintain the caret position during input', () => {
    render(<App />);
    const phoneInput = screen.getByPlaceholderText('mobile number');;

    // Simulate typing the phone number
    fireEvent.change(phoneInput, { target: { value: '12345' } });

    // Set initial caret position
    phoneInput.setSelectionRange(2, 2);

    fireEvent.change(phoneInput, { target: { value: '132' } });

    // Check if the caret position is maintained
    expect(phoneInput.selectionStart).toBe(3);
    expect(phoneInput.selectionEnd).toBe(3);
  });
});
