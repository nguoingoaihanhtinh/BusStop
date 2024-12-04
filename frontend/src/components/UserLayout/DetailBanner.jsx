import { Link } from 'react-router-dom'; // Import Link from react-router-dom to enable navigation

export default function TicketBanner({title}) {
  return (
    <div>
      <div className="flex gap-8 justify-center">
        <div className="basis-[100%]">
          <div
            className="w-full h-[550px] bg-no-repeat bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url(https://thacoauto.vn/storage/mercedes-benz-bus/banner-post-mer-bus-giuongnam.jpg)`,
            }}
          >
            <div className="px-5 relative h-full rounded-lg bg-banner-ct flex flex-col justify-center w-full">
              <div className="bg-black bg-opacity-30 w-1/4 py-4 px-8 rounded-xl">
                {/* Header with a Back to Home link */}
                <div className="flex justify-between items-center text-white">
                  <Link to="/" className="text-lg font-semibold hover:text-yellow-500 text-primary-color">
                    &larr; Back to Home
                  </Link>
                </div>
                <div className="mt-4 text-3xl font-bold">{title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
