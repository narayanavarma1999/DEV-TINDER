import { useState, useEffect } from 'react';

const Location = ({
  onLocationSelect,
  placeholder = "Enter your location...",
  initialValue = ""
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Initialize with initialValue if provided
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (onLocationSelect) {
      onLocationSelect(value); // Pass the current value immediately
    }
  };

  return (
    <div className="w-full">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-sm font-semibold text-primary">Your Location</span>
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Location;