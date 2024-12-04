import React, { useEffect, useState } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineChair } from 'react-icons/md';

// Function to generate seat data based on the seatLeft count
const generateSeats = (seatLeft) => {
  const rows = ['A', 'B'];
  const seatData = [];
  const totalSeats = 36; // Total number of seats (18 per row, 2 rows)
  
  // Create an array with "available" and "booked" statuses
  let seatStatuses = Array(totalSeats).fill('booked'); // Initially, all seats are booked
  for (let i = 0; i < seatLeft; i++) {
    seatStatuses[i] = 'available'; // Set the first `seatLeft` seats to available
  }

  // Shuffle the seat statuses randomly
  seatStatuses = seatStatuses.sort(() => Math.random() - 0.5);

  // Assign the seat statuses to the seat data
  let seatIndex = 0;
  rows.forEach((row) => {
    for (let i = 1; i <= 18; i++) {
      const seatId = `${row}${i}`;
      seatData.push({
        id: seatId,
        status: seatStatuses[seatIndex], // Assign the randomized status
        price: 3000,
      });
      seatIndex++;
    }
  });

  return seatData;
};

const BusSeat = ({ selectedSeats, setSelectedSeats, seatLeft }) => {
  const [showError, setShowError] = useState(false);
  const [busSeatData, setBusSeatData] = useState([]);

  useEffect(() => {
    // Update seat data whenever seatLeft changes
    setBusSeatData(generateSeats(seatLeft));
  }, [seatLeft]);

  const handleSeatClick = (seatId) => {
    const seat = busSeatData.find((seat) => seat.id === seatId);
    if (seat.status === 'booked') {
      return; // If the seat is booked, do nothing
    }
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        if (prevSelectedSeats.length >= 10) {
          setShowError(true); // Show error if more than 10 seats are selected
          return prevSelectedSeats;
        } else {
          return [...prevSelectedSeats, seatId];
        }
      }
    });
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const getSeatName = (seat) => {
    if (seat.status === 'booked') {
      return 'text-red-500 cursor-not-allowed';
    }
    if (selectedSeats.includes(seat.id)) {
      return 'text-yellow-500 cursor-pointer';
    }
    return 'text-black cursor-pointer';
  };

  return (
    <div className="w-3/5 flex items-center justify-center shadow-lg h-full">
      <div className="w-full border rounded-xl">
        <p className="text-base text-black font-medium text-center pt-3">
          Click on available seats to reserve your seat.
        </p>
        <div className="w-full flex items-center gap-x-1.5 py-2 px-3">
          <div className="w-10 h-fit flex flex-col justify-center mx-5">
            <GiSteeringWheel className="text-3xl mt-7 text-black -rotate-90" />
          </div>
          <div className="flex flex-col items-center border-l-2 border-dashed px-3 ">
            {['A', 'B'].map((row) => (
              <div key={row} className="mb-4">
                <h6 className="text-lg font-bold text-center mb-2">{`Row ${row}`}</h6>
                <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                  {busSeatData
                    .filter((seat) => seat.id.startsWith(row))
                    .map((seat) => (
                      <div
                        key={seat.id}
                        className="flex items-center gap-x-0.5 cursor-pointer justify-between"
                        onClick={() => handleSeatClick(seat.id)}
                      >
                        <h6 className="text-base text-black font-bold">{seat.id}</h6>
                        <MdOutlineChair
                          className={`text-3xl -rotate-90 ${getSeatName(seat)}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Instructions Section */}
        <div className="text-center border-t-2 border-dashed p-2">
          <h6 className="text-lg font-bold">Seat Legend:</h6>
          <div className="flex justify-center gap-x-4">
            <div className="flex items-center">
              <MdOutlineChair className="text-3xl text-black" />
              <p className="ml-2 text-sm text-black-2">Available Seat</p>
            </div>
            <div className="flex items-center">
              <MdOutlineChair className="text-3xl text-red-500" />
              <p className="ml-2 text-sm text-black-2">Booked Seat</p>
            </div>
            <div className="flex items-center">
              <MdOutlineChair className="text-3xl text-yellow-500" />
              <p className="ml-2 text-sm text-black-2">Selected Seat</p>
            </div>
          </div>
        </div>
        {showError && (
          <p className="text-red-500 mt-4 text-center">
            You can select up to 10 seats only.
          </p>
        )}
      </div>
    </div>
  );
};

export default BusSeat;
