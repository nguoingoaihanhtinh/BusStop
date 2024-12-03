
import TicketCard from "../../components/Ticket/TicketCard";
import Banner from "./Banner";
import Service from "./Service";

const mockTicket = {
  busName: "Mustang Deluxe",
  departure: "Kathmandu",
  destination: "Mustang",
  startTime: "06:30 AM",
  arrivalTime: "06:45 PM",
  price: 1600,
  seatsAvailable: 5,
  seatType: "Sofa",
  seatCapacity: 35,
  rating: 4.5,
};
const HomePage = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-5 mt-10 px-30">
      <div className="banner border rounded-xl ">
        <Banner />
      </div>
      <div className="w-full flex gap-10  ">
        <div className="content w-full">
          <Service />
          {/* <HomeContent /> */}
        </div>
        
      </div>
      <div className="banner2 flex justify-center">
      <TicketCard searchedTicket={mockTicket}
      />

      </div>
      <div className="category px-25">
        {/* <CategorySection /> */}
      </div>
      
    </div>
  );
};

export default HomePage;
