import React, { useState, useEffect } from "react";
import TicketCard from "../../components/Ticket/TicketCard";
import LocationSearch from "../../components/UserLayout/header/LocationSearch";
import { useGetAllTicketsQuery } from "../../redux/rtk/ticket.service";
import Filter from "./Filter";
const typeMap = {
  1: "Economy",
  2: "Standard",
  3: "Luxury",
  4: "VIP",
};

const modelMap = {
  1: "Hyundai Universe",
  2: "Toyota Coaster",
  3: "Audi",
  4: "Mercedes Benz",
  5: "Thaco TB85",
};
const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    departure: "",
    destination: "",
    page: 1,
    limit: 10,
    filters: {
      types: [],
      models: [],
      price: [0, 3500000],
    },
  });

  const { data, isFetching, error } = useGetAllTicketsQuery({
    page: searchParams.page,
    limit: searchParams.limit,
    departure: searchParams.departure,
    destination: searchParams.destination,
    types: searchParams.filters.types.map((id) => typeMap[id]).join(","), // Convert integers to strings
    models: searchParams.filters.models.map((id) => modelMap[id]).join(","), // Convert integers to strings
    priceMin: searchParams.filters.price[0],
    priceMax: searchParams.filters.price[1],
  });
  const tickets = data?.data  || [];

  const handleSearchChange = (params) => {
    setSearchParams((prev) => ({
      ...prev,
      ...params,
    }));
  };
  const handleFilterChange = (filters) => {
    setSearchParams((prev) => ({
      ...prev,
      filters,
      page: 1, // Reset page to 1 on filter change
    }));
  };
  useEffect(() => {
    console.log("Query parameters sent to API:", {
      page: searchParams.page,
      limit: searchParams.limit,
      types: searchParams.filters.types.map((id) => typeMap[id]).join(","),
      models: searchParams.filters.models.map((id) => modelMap[id]).join(","),
      priceMin: searchParams.filters.price[0],
      priceMax: searchParams.filters.price[1],
    });
  }, [searchParams]);
  

  return (
    <div className="flex flex-col mx-10">
      <div className="header">
        
      </div>
      <LocationSearch onSearchChange={handleSearchChange} />
      <div className="py-5 px-20 w-full flex gap-5">
        <div className="filter w-1/4">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="content w-3/4">
          {isFetching ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching tickets</p>
          ) : tickets.length === 0 ? (
            <p className="text-center text-lg font-semibold mt-8">
              No tickets available
            </p>
          ) : (
            <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-6">
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
