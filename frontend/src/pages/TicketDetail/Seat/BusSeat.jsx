import React, { useEffect, useState } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineChair } from 'react-icons/md';

const generateSeats = () => {
  const rows = ['A', 'B'];
  const seatData = [];
  rows.forEach((row) => {
    for (let i = 1; i <= 18; i++) {
      seatData.push({
        id: `${row}${i}`,
        status: Math.random() > 0.5 ? 'available' : 'booked', // Randomly assign status
        price: 3000,
      });
    }
  });
  return seatData;
};

const busSeatData = generateSeats();

const BusSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleSeatClick = (seatId) => {
    const seat = busSeatData.find((seat) => seat.id === seatId);
    if (seat.status === 'booked') {
      return;
    }
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        if (prevSelectedSeats.length >= 10) {
          setShowError(true);
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
    <div className="w-full grid grid-cols-5 gap-10">
      <div className="col-span-3 w-full flex items-center justify-center">
        <div className="w-full">
          <p className="text-base text-black font-medium text-center">
            Click on available seats to reserve your seat.
          </p>
          {/* Seat Layout */}
          <div className="w-full flex items-stretch gap-x-1.5">
            <div className="w-10 h-fit">
              <GiSteeringWheel className="text-3xl mt-7 text-black -rotate-90" />
            </div>
            {/* Rows */}
            <div className="flex flex-col items-center border-l-2 border-dashed">
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
          {/* Reservation */}
          <div className="w-full flex items-center justify-center gap-6 border"></div>
        </div>
      </div>
      {/* Seat Selection */}
      <div className="col-span-2 w-full bg-white rounded-xl px-4 py-6 border shadow-sm">
        <h4 className="text-lg font-bold mb-4">Selected Seats</h4>
        <div>
          {selectedSeats.length > 0 ? (
            <ul>
              {selectedSeats.map((seat) => (
                <li key={seat}>{seat}</li>
              ))}
            </ul>
          ) : (
            <p>No seats selected.</p>
          )}
        </div>
        {showError && (
          <p className="text-red-500 mt-4">
            You can select up to 10 seats only.
          </p>
        )}
      </div>
    </div>
  );
};

export default BusSeat;
