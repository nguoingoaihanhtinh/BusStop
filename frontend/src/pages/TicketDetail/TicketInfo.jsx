import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDateAndTime } from '../../utils/converter';
import { Button } from 'antd';

const TicketInfo = ({ selectedSeats, ticket, navigate, hideCheckoutButton }) => {
  const handleCheckout = () => {
    navigate('/checkout', { state: { ticket, selectedSeats } });
  };

  return (
    <div className=" bg-white rounded-xl px-4 w-full">
      <div className="flex flex-col border rounded-xl shadow-md p-5">
        <div className="header flex justify-between items-center">
          <h2 className="text-lg text-black">Your Destination</h2>
          <Link to={'/search'}>
            <h4 className="text-md text-purple-500">Change Route</h4>
          </Link>
        </div>
        <div className="route flex justify-between">
          <div className="departure flex flex-col justify-center">
            <h5 className="text-md text-gray-500">From</h5>
            <h4 className="text-md font-semibold text-black">{ticket.departure}</h4>
            <h3 className="text-md font-semibold text-black">{formatDateAndTime(ticket.startTime)}</h3>
          </div>
          <div className="destination flex flex-col justify-center text-end">
            <h5 className="text-md text-gray-500">To</h5>
            <h4 className="text-md font-semibold text-black">{ticket.destination}</h4>
            <h3 className="text-md font-semibold text-black">{formatDateAndTime(ticket.arrivalTime)}</h3>
          </div>
        </div>
        <div className="seat flex flex-col justify-center items-center">
          <h2 className="seatheader text-lg text-black font-semibold">Selected Seats</h2>
          <div className="seats flex gap-3 flex-wrap justify-center">
            {selectedSeats.length > 0 ? (
              selectedSeats.map((seat) => (
                <div
                  key={seat}
                  className="seat border rounded-xl bg-gray-300 text-black font-semibold text-lg px-2 py-1"
                >
                  {seat}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No seats selected.</p>
            )}
          </div>
        </div>
        <div className="priceDetail flex flex-col gap-3">
          <h4 className="header text-lg font-semibold">Price Details</h4>
          <div className="price flex justify-between">
            <h5 className="text-black font-normal text-base">Unit price:</h5>
            <h5 className="text-black font-normal text-base">{formatCurrency(ticket.price)} d</h5>
          </div>
          <div className="total flex justify-between">
            <h4 className="total text-black text-lg font-semibold">Total price:</h4>
            <h4 className="text-lg text-black font-semibold">{formatCurrency(selectedSeats.length * ticket.price)} d</h4>
          </div>
        </div>
        {!hideCheckoutButton && (
          <div className="checkout flex justify-center p-2">
            <Button onClick={handleCheckout} className="bg-red-400 text-white text-lg hover:bg-red-600">
              Proceed to checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketInfo;
