import React from 'react';
import { useLocation } from 'react-router-dom'; // To get navigation state
import TicketBanner from '../../components/UserLayout/DetailBanner';
import TicketInfo from '../TicketDetail/TicketInfo';
import PaymentMethod from './PaymentMethod';

const CheckoutPage = () => {
  const location = useLocation();
  const { ticket, selectedSeats } = location.state || {}; // Get data from navigation state
    console.log('ticket',ticket);
  return (
    <div className="px-30">
      <div className="w-full space-y-12 pb-16">
        <TicketBanner title={"Checkout Page"} />
      </div>
      <div className="flex">
        <div className="col-span-4 py-4 space-y-6 w-2/3 border rounded-xl p-5">
          <h1 className="text-xl text-black font-semibold">Passenger Information</h1>
          <div className="space-y-7">
            <div className="w-full space-y-2">
              <label htmlFor="name" className="text-sm text-black font-medium">Full name</label>
              <input
                type="text"
                placeholder="e.g Khoa Phan"
                className="w-full h-14 px-4 bg-gray-100 bg-opacity-35 focus:bg-gray-100/70 border text-black 
                rounded-xl focus:outline-none text-base font-normal"
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="email" className="text-sm text-black font-medium">Email address</label>
              <input
                type="email"
                placeholder="e.g khoa@gmail.com"
                className="w-full h-14 px-4 bg-gray-100/40 focus:bg-gray-100/70 border text-black 
                rounded-xl focus:outline-none text-base font-normal"
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="phone" className="text-sm text-black font-medium">Phone number</label>
              <input
                type="number"
                placeholder="e.g 056***1553"
                className="w-full h-14 px-4 bg-gray-100/40 focus:bg-gray-100/70 border text-black 
                rounded-xl focus:outline-none text-base font-normal"
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="address" className="text-sm text-black font-medium">Pickup station</label>
              <select
                className="w-full h-14 px-4 bg-gray-100/40 focus:bg-gray-100/70 border text-black 
                rounded-xl focus:outline-none text-base font-normal"
              >
                <option selected disabled>Choose your nearest pickup Station</option>
                <option value="tanphu">Tan Phu, TpHCM</option>
                <option value="thuduc">Thu Duc, TpHCM</option>
                <option value="hanoi">Ha Noi</option>
                <option value="danang">Da Nang</option>
              </select>
            </div>
          </div>
          <div className="payment">
            <PaymentMethod />
          </div>
        </div>
        {/* TicketInfo Component */}
        <div className="pay flex flex-col  w-1/3 gap-5">
            <div className="info w-full"><TicketInfo ticket={ticket} selectedSeats={selectedSeats} hideCheckoutButton={true} /></div>

            <div className="pay p-5">
                <button className='w-full'>Proceed to pay</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
