import React from 'react'
import { FaCircleCheck, FaPhone } from 'react-icons/fa6'
import { formatCurrency, formatDateAndTime } from '../../utils/converter'

const Invoice = ({ticket, order}) => {
console.log('ticket',ticket)
const orderDetail = order?.order;
const userDetail = order?.user;
console.log('order',order)
const total = ticket.price * ticket.Seats.length;
console.log('total',total)
  return (
    <div className='w-[1000px] flex '>
        <div className="flex flex-col w-full border rounded-xl">
            <div className="header bg-red-600 text-white flex p-5 rounded-t-xl">
                <h1 className="h1 text-xl font-semibold">{ticket.Bus.Name}</h1>
            </div>
            <div className="content flex flex-col gap-2 px-5 py-2">
                <div className="ticketInfo flex justify-between">
                    <h3 className="text-lg font-normal text-gray-500">ticket id: {ticket.TicketId}</h3>
                    <h3 className="text-lg font-normal text-gray-500">{formatDateAndTime('2024-04-12 06:30:00', 'date')}</h3>
                </div>
                <div className="mainconten flex justify-between border-t-2 border-b-2 border-dashed ">
                    <div className="userInfo flex flex-col py-2 gap-3">
                        <h3 className="text-base text-black">Name of Passenger: {userDetail.Username}</h3>
                        <h3 className="text-base text-black">
                            Total Seat No.: {ticket.Seats.map(seat => seat.SeatNumber).join(', ')}
                        </h3>

                        <h3 className="text-base text-black">Pickup Station: {orderDetail.Address}</h3>
                    </div>
                    <div className="cost flex flex-col gap-3 py-2 items-end">
                        <h3 className="text-base text-gray-500">Total Price</h3>
                        <h2 className="text-lg text-black">{formatCurrency(total)}d</h2>
                        <div className="paid border rounded-full border-green-5 flex gap-2 px-2 bg-green-200 items-center ">
                            <div className="icon"><FaCircleCheck className='tet-white bg-green-500' /></div>
                            <h3 className="text-green-500 text-base">Bill Paid</h3>
                        </div>
                    </div>
                </div>
                <div className="route flex justify-between">
                    <h3 className="text-gray-500 text-base font-normal">{ticket.departure} ----- {ticket.destination} </h3>
                    <h3 className="text-gray-500 text-base font-normal"> Departure at {formatDateAndTime(ticket.startTime, 'time')}</h3>
                    <h3 className="text-gray-500 text-base font-normal">Arrive at {formatDateAndTime(ticket.arrivalTime, 'time')} </h3>
                </div>
            </div>
            <div className="end flex justify-center gap-2 items-center p-2 text-sm text-white bg-red-600 rounded-b-xl">
                <FaPhone />
                <h4 className="">+84 563 ******</h4>
            </div>
        </div>
    </div>
  )
}

export default Invoice