import React, { useState } from 'react';

const PriceRangePicker = ({ onSubmit }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  
  const handleSubmit = () => {
    onSubmit(minPrice, maxPrice);
  };

  return (
    <div className="absolute bg-white border rounded-lg shadow-lg p-4 mt-2 z-50">
      <div className="flex flex-col items-center mb-4">
        <label className="mb-2">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <label className="mb-2">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
            className="px-4 py-2 bg-rose-500 text-white rounded"
            onClick={handleSubmit}
        >
            Submit
        </button>
      </div>
    </div>
  )
}

export default PriceRangePicker;
