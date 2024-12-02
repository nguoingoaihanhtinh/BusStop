import { FaWifi, FaTv, FaUtensils, FaChargingStation } from "react-icons/fa6";

function ServiceCard() {
  return (
    <div className="max-w-md  bg-white border rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center">
        <div className="basis-1/3 text-left">
          <h3 className="text-md font-bold text-gray-400">From</h3>
          <p className="text-gray-700 text-lg">Kathmandu</p>
        </div>
        <div className="text-gray-600 basis-1/3 items-center text-center">
          <p className="border-2 py-1 px-2 rounded-full">6 Hrs</p>
        </div>
        <div className="basis-1/3 text-right">
          <h3 className="text-md font-bold text-gray-400">To</h3>
          <p className="text-gray-700 text-lg">Chitwan</p>
        </div>
      </div>
      <div className="border-t my-4"></div>
      <div className="flex space-x-2 text-gray-600 justify-center">
        <div className="flex items-center space-x-1">
          <FaWifi />
          <span className="text-sm">Internet</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaUtensils />
          <span className="text-sm">Snacks</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaTv />
          <span className="text-sm">TV</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaChargingStation />
          <span className="text-sm">Mobile Charging</span>
        </div>
      </div>
      <div className="border-t my-4"></div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary-color">10000đ</p>
        <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600">
          Reserve Seat
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
