import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import TicketBanner from '../../components/UserLayout/DetailBanner';
import Invoice from './Invoice';
import { useGetTicketByIdQuery } from '../../redux/rtk/ticket.service';
import { useGetOrderDetailQuery, useGetOrderQuery, useGetUserByIdQuery } from '../../redux/rtk/user.service';

const InvoicePage = () => {
    const { state } = useLocation();
    const { order } = state || {};
    // console.log('order',order)
    const orderData = order?.data || {}; // Access the 'data' directly
    console.log('data',orderData)
    const ticketId = orderData?.TicketId;
    const userId = orderData?.UserId;

    const {data: orderDetails} = useGetOrderDetailQuery(orderData.OrderId);
    const orderDetail = orderDetails?.data || {}
    // Fetch ticket details based on TicketId
    const { data: ticketDetails, isLoading: ticketLoading } = useGetTicketByIdQuery(ticketId);
    const ticketData = ticketDetails?.data || {};
    // Fetch user details based on UserId

    if (ticketLoading ) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div>
            <TicketBanner title={"Collect your invoice"} />
            <div className="px-30 w-full p-5 flex justify-center">
                <Invoice ticket={ticketData}  order={orderDetail} />
            </div>
            <div className="button flex justify-center">
                <button className="text-white bg-red-600 m-5">Download now</button>
            </div>
        </div>
    );
};

export default InvoicePage;
