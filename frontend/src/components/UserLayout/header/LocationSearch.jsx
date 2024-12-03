import React, { useState } from "react";
import { FaArrowsLeftRight, FaLocationDot, FaMagnifyingGlass } from "react-icons/fa6";

const LocationSearch = ({ onSearchChange }) => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    onSearchChange({ departure, destination, page: 1 }); // Reset to page 1 on each new search
  };

  return (
    <div className="w-full bg-black bg-opacity-30 border p-5 rounded-xl">
      <div className="w-full flex items-center justify-between gap-5">
        <div className="w-[80%] flex items-center">
          <div className="w-1/2 h-14 border border-gray-200 rounded-xl bg-black flex items-center px-5">
            <input
              type="text"
              placeholder="From..."
              className="w-full bg-transparent outline-none py-3"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
            <FaLocationDot />
          </div>
          <button className="bg-black bg-opacity-40 px-3 mx-1">
            <FaArrowsLeftRight className="w-6 h-6 text-green-500" />
          </button>
          <div className="w-1/2 h-14 border border-gray-200 rounded-xl bg-black  flex items-center px-5">
            <input
              type="text"
              placeholder="To..."
              className="w-full bg-transparent outline-none py-3"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <FaLocationDot />
          </div>
        </div>
        <div className="w-[20%] flex items-center gap-5">
          <button
            className="h-14 px-5 bg-primary-color border-primary-color rounded-xl text-white flex items-center gap-2"
            onClick={handleSearch}
          >
            <FaMagnifyingGlass />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
