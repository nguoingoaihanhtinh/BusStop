import React from "react";
import { FaArrowRight, FaBus, FaCouch, FaStar } from "react-icons/fa6";

const TicketCard = ({ busName, departure, destination, startTime, arrivalTime, price, seatsAvailable, seatType, seatCapacity, rating }) => {
  return (
    <div className="border w-full rounded-lg p-4 shadow-md flex flex-col items-center justify-between">
        <div className="topitem flex justify-between gap-5 items-center w-full">
             {/* Bus Info */}
            <div className="flex items-start space-x-4 w-2/3">
                <div className="text-red-500 text-2xl">
                    <FaBus />
                </div>
                <h2 className="font-bold text-lg text-primary">{busName}</h2>
            </div>
            <div className="flex items-center text-sm text-gray-500 justify-between gap-5 w-1/3">
                    <span className="p-2 border rounded-xl">AC</span>
                    <span className="p-2 border rounded-xl flex gap-1 justify-center items-center"><FaStar />{rating} <i className="fas fa-star text-yellow-500"></i></span>
                    <span className="p-2 border rounded-xl flex gap-1 justify-center items-center"><FaCouch />{seatType}</span>
                    <span className="p-2 border rounded-xl flex gap-1 justify-center items-center"><FaCouch />{seatCapacity} seats</span>
            </div>
          </div>
      {/* Timing Info */}
      <div className="flex items-center text-center justify-between gap-5">
        <div>
          <span className="font-bold text-xl text-black-2">{startTime}</span>
          <p className=" text-black text-base">{departure}</p>
        </div>
        <div className="text-red-500 text-xl">
            <FaArrowRight />
        </div>
        <div>
          <span className="font-bold text-xl text-black-2">{arrivalTime}</span>
          <p className="text-black text-base">{destination}</p>
        </div>
      </div>

      {/* Booking Info */}
      <div className="text-right flex items-center justify-between w-full">
        <p className="text-lg font-bold text-black"> {price} <span className="text-gray-400 text-sm">d/per seat</span></p>
        <p className={`text-xl ${seatsAvailable > 0 ? "text-green-500" : "text-red-500"}`}>
          {seatsAvailable > 0 ? `${seatsAvailable} seats available` : "Sold out"}
        </p>
        {seatsAvailable > 0 && (
          <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
            Reserve Seat
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketCard;