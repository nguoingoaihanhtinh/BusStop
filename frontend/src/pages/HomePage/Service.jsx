import React from 'react';
import ServiceCard from '../../components/BusService/ServiceCard';

const data = [
    {
        id: 1,
        title: "Khoa",
        img: "https://www.shutterstock.com/image-vector/empty-bus-stop-sky-background-600nw-2394058507.jpg",
    },
    // Add more services if needed
];

const Service = () => {
  return (
    <div className='space-y-12'>
        <div className="w-full flex items-center justify-center text-center">
            <h1 className='text-3xl text-primary-color font-bold'>
                Our <span className='text-green-800'>Services</span>
            </h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    </div>
  );
};

export default Service;
