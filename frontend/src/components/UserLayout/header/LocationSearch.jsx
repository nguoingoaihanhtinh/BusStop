import React from 'react'
import { FaArrowsLeftRight, FaLocationDot, FaMagnifyingGlass, FaMapLocation, FaMapLocationDot, FaStackExchange } from 'react-icons/fa6'

const LocationSearch = () => {
  return (
    <div className = 'w-full bg-black bg-opacity-30 border p-5 rounded-xl'>
        <div className="w-full flex items-center justify-between gap-5">
            {/* Search */}
            <div className="w-[60%] flex items-center ">
                {/* From */}
                <div className="w-1/2 h-14 border border-gray-200 text-base font-medium rounded-xl bg-opacity-50 bg-white flex items-center px-5">
                <input
                    type="text"
                    placeholder="From ... "
                    className="w-full bg-transparent text-primary-color outline-none  py-3"
                    // value={searchQuery}
                    // onChange={(e) => {
                    //     setSearchQuery(e.target.value);
                    //     setIsSearching(true);
                    // }}
                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter') {
                    //     handleSearchSubmit(); // Submit on Enter key press
                    //     }
                    // }}
                    />
                    <div className="text-primary-color"><FaLocationDot/></div>
                </div>
                
                <button className='bg-opacity-40 bg-black px-3 mx-1'>
                    <FaArrowsLeftRight className='w-6 h-6  text-green-500'/>
                </button>
                {/* To */}
                <div className="w-1/2 h-14 border border-gray-200 text-base font-medium rounded-xl bg-opacity-50 bg-white flex items-center px-5">
                <input
                    type="text"
                    placeholder="To ... "
                    className="w-full bg-transparent text-primary-color outline-none py-3"
                    />
                    <div className="text-primary-color"><FaLocationDot/></div>
                </div>
            </div>
            <div className="w-[40%] h-14 flex items-center gap-5 justify-between">
                <div className="flex-1 h-full  border border-gray-200 text-base font-medium rounded-xl bg-opacity-50 bg-white flex items-center px-5">
                    <input
                        type="date"
                        className="w-full bg-transparent text-primary-color outline-none py-3"
                    />
                </div>
                <button className='w-fit h-14 px-5 border bg-primary-color border-primary-color hover:font-bold rounded-xl text-base flex items-center gap-5'><FaMagnifyingGlass />Search</button>
            </div>
        </div>
    </div>
  )
}

export default LocationSearch