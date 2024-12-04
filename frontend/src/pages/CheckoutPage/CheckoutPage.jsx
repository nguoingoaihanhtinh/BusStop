import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TicketBanner from '../../components/UserLayout/DetailBanner';
import TicketInfo from '../TicketDetail/TicketInfo';
import PaymentMethod from './PaymentMethod';
import { useCreateOrderMutation, useGetOrderQuery } from '../../redux/rtk/user.service';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: order, error, isLoading } = useGetOrderQuery(); // Fetch order data
    const [createOrder, { isLoading: isCreating, error: createError }] = useCreateOrderMutation(); // Hook for creating orders
    const { state } = location;

    const [passengerInfo, setPassengerInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
    });

    // Extract the ticket and selectedSeats from orderData or fallback to state
    const ticket = order?.ticket || state?.ticket;
    const selectedSeats = order?.selectedSeats || state?.selectedSeats;
    // console.log('ticket',ticket)
    const handlePay = async () => {
        if (!ticket || !selectedSeats || selectedSeats.length === 0) {
            console.error("Missing ticket or selected seats");
            return; // Optionally show an error message to the user
        }
    
        const totalPrice = ticket.price * selectedSeats.length; // Calculate total price
        const createdDate = new Date().toISOString(); // Set createdDate to the current date
    
        // Use the address from passengerInfo
        const address = passengerInfo.address;
    
        const payload = {
            ticketId: ticket.TicketId,
            selectedSeats,
            totalPrice,
            address, // Add the selected address here
            CreatedAt: createdDate, // Set CreatedAt to the current date
        };
    
        console.log("Payload for order creation:", payload);
    
        try {
            const newOrder = await createOrder(payload).unwrap();
            console.log("Order created successfully:", newOrder);
            navigate("/invoice", { state: { order: newOrder } });
        } catch (err) {
            console.error("Error creating order:", err);
        }
    };
    

    // Handle input change for passenger details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassengerInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (error) {
            console.error("Error fetching order:", error);
        }
        if (createError) {
            console.error("Error creating order:", createError);
        }
    }, [error, createError]);

    if (isLoading || isCreating) {
        return <div>Loading...</div>;
    }

    if (!ticket || !selectedSeats) {
        return <div>Invalid checkout data. Please go back and select a ticket.</div>;
    }

    return (
        <div className="px-30">
            <div className="w-full space-y-12 pb-16">
                <TicketBanner title="Checkout Page" />
            </div>
            <div className="flex">
                <div className="col-span-4 py-4 space-y-6 w-2/3 border rounded-xl p-5">
                    <h1 className="text-xl text-black font-semibold">Passenger Information</h1>
                    <div className="space-y-7">
                        <div className="w-full space-y-2">
                            <label htmlFor="name" className="text-sm text-black font-medium">
                                Full name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={passengerInfo.fullName}
                                onChange={handleInputChange}
                                placeholder="e.g Khoa Phan"
                                className="w-full h-14 px-4 bg-gray-100 bg-opacity-35 focus:bg-gray-100/70 border text-black 
                                rounded-xl focus:outline-none text-base font-normal"
                            />
                        </div>
                        <div className="w-full space-y-2">
                            <label htmlFor="email" className="text-sm text-black font-medium">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={passengerInfo.email}
                                onChange={handleInputChange}
                                placeholder="e.g khoa@gmail.com"
                                className="w-full h-14 px-4 bg-gray-100/40 focus:bg-gray-100/70 border text-black 
                                rounded-xl focus:outline-none text-base font-normal"
                            />
                        </div>
                        <div className="w-full space-y-2">
                            <label htmlFor="phone" className="text-sm text-black font-medium">
                                Phone number
                            </label>
                            <input
                                type="number"
                                name="phone"
                                value={passengerInfo.phone}
                                onChange={handleInputChange}
                                placeholder="e.g 056***1553"
                                className="w-full h-14 px-4 bg-gray-100/40 focus:bg-gray-100/70 border text-black 
                                rounded-xl focus:outline-none text-base font-normal"
                            />
                        </div>
                        <div className="w-full space-y-2">
                            <label htmlFor="address" className="text-sm text-black font-medium">
                                Pickup station
                            </label>
                            <select
                                name="address"
                                value={passengerInfo.address}
                                onChange={handleInputChange}
                                className="w-full h-14 px-4 bg-gray-100/40 focus:bg-gray-100/70 border text-black 
                                rounded-xl focus:outline-none text-base font-normal"
                            >
                                <option selected disabled>
                                    Choose your nearest pickup Station
                                </option>
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
                <div className="pay flex flex-col w-1/3 gap-5">
                    <div className="info w-full">
                        {isLoading ? (
                            <p>Loading ticket details...</p>
                        ) : (
                            <TicketInfo ticket={ticket} selectedSeats={selectedSeats} hideCheckoutButton={true} />
                        )}
                    </div>
                    <div className="pay p-5">
                        <button className="w-full" onClick={handlePay}>
                            Proceed to pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
