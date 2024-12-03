import React, { useState, useEffect } from "react";
import TicketCard from "../../components/Ticket/TicketCard";
import LocationSearch from "../../components/UserLayout/header/LocationSearch";
import { useGetAllTicketsQuery } from "../../redux/rtk/ticket.service";
import Filter from "./Filter";
const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    departure: "",
    destination: "",
    page: 1,
    limit: 10,
  });

  const { data, isFetching, error } = useGetAllTicketsQuery(searchParams);
  const tickets = data?.data  || [];

  const handleSearchChange = (params) => {
    setSearchParams((prev) => ({
      ...prev,
      ...params,
    }));
  };

  useEffect(() => {
    // Log search params for debugging
    console.log('Current search params:', searchParams);
    console.log("Fetched tickets data:", data); 
    console.log('ticket', tickets);
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      <LocationSearch onSearchChange={handleSearchChange} />
      <div className="py-5 px-20 w-full flex">
        <div className="filter">
          <Filter />
        </div>
        <div className="content">
          {isFetching ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching tickets</p>
          ) : tickets.length === 0 ? (
            <p className="text-center text-text/lg/semibold mt-8">No tickets available</p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-4 gap-x-[36px] gap-y-[16px]">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} searchedTicket={ticket} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
