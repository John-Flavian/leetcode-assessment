import { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const normalizeInput = (e, previousValue) => {
    let value = e.target.value;
    let selection = e.target.selectionStart;

    // return nothing if no value
    if (!value) return [value, selection];

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      // returns: "x", "xx", "xxx"
      if (cvLength < 4) return [currentValue, selection];

      // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
      if (cvLength < 7) return [`(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`, selection];

      // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
      return [`(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`, selection];
    }

    // handle cases where the input is not changed
    return [value, selection];

  };

  const handleInputChange = (e) => {
    const [text, caretPosition] = normalizeInput(e, input);

    setInput(text);

    inputRef.current.selectionStart = caretPosition;
    inputRef.current.selectionEnd = caretPosition;
  }

  return (
    <>
      <main>
        <div>
          <h3>Input Formatter</h3>
        </div>
        <div className="container text-center">
          <input
            type="tel"
            id="phone"
            maxLength="16"
            ref={inputRef}
            placeholder="mobile number"
            autoComplete="off"
            value={input}
            onChange={handleInputChange}
          />
          <div className='label'>
            <label htmlFor="phone">Format: (123) 456-7890</label>
          </div>
        </div>
      </main>
    </>
  )
}
