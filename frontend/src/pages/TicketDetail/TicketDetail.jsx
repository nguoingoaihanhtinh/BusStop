import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import the useParams hook
import BusSeat from './Seat/BusSeat';
import { useGetTicketByIdQuery } from '../../redux/rtk/ticket.service';
import TicketInfo from './TicketInfo';
import TicketBanner from '../../components/UserLayout/DetailBanner';


const TicketDetail = () => {
  const { ticketId } = useParams(); // Extract ticketId from the URL
  const navigate = useNavigate();
  const { data: ticketData, isLoading, error } = useGetTicketByIdQuery(ticketId);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (isLoading) return <p>Loading ticket details...</p>;
  if (error) return <p>Error loading ticket details.</p>;

  const ticket = ticketData?.data;
  console.log('ticket',ticket)
  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="banner">
        <TicketBanner title={"Ticket Details"} />
      </div>
      <div className="flex w-full px-30 ">
        <BusSeat
          seatLeft={ticket?.seatleft}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
        <div className="info w-2/5">
        <TicketInfo 
          ticket={ticket}
          selectedSeats={selectedSeats}
          navigate={navigate}
        />
        </div>

      </div>
    </div>

  );
};

export default TicketDetail;
