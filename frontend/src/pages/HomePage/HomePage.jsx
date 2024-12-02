
import Banner from "./Banner";
import Service from "./Service";


const HomePage = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-5 mt-10 px-30">
      <div className="banner border rounded-xl ">
        <Banner />
      </div>
      <div className="w-full flex gap-10  ">
        <div className="content w-full">
          <Service />
          {/* <HomeContent /> */}
        </div>
      </div>
      <div className="banner2 flex justify-center">
        {/* <Banner2 /> */}
      </div>
      <div className="category px-25">
        {/* <CategorySection /> */}
      </div>
      
    </div>
  );
};

export default HomePage;
