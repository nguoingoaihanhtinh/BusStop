import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import UserSection from "./UserSection";
import SortBar from "../../filter/SortBar";

const Header = () => {
  return (
    <div className="flex flex-col fixed bg-blue-900  left-0 right-0 top-0  px-6 md:px-24 gap-8 py-4 md:py-0 z-[10]">
      {/* Header Section */}
      <div className="top-header  flex w-full justify-between items-center mt-5 ">
        <Link
          to="/"
          className="h-[40px] w-[100px] md:h-[50px] md:w-[146px] bg-no-repeat bg-contain bg-center text-2xl font-semibold text-left basis-[40%]"
        >BusStop</Link>
        <Navigation />
        <UserSection />
      </div>
    </div>
  );
};

export default Header;
