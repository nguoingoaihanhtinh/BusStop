
import LocationSearch from "../../components/UserLayout/header/LocationSearch";


export default function Banner() {
    return (
      <div>
        <div className="flex gap-8 justify-center">
          <div className="basis-[100%]">
            <div
              className=" w-full h-[550px] bg-no-repeat bg-cover bg-center rounded-xl"
              style={{
                backgroundImage: `url(https://www.shutterstock.com/image-vector/empty-bus-stop-sky-background-600nw-2394058507.jpg)`,
              }}
            >
              <div className="w-full px-5 relative h-full rounded-lg bg-banner-ct flex flex-col justify-center">
               <LocationSearch />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
  