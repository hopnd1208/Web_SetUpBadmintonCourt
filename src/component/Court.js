import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourts } from "../api/CourtAPI";


const Court = () => {
  const [filteredCourts, setFilteredCourts] = useState([]);

  useEffect(() => {
    getCourts()
      .then((data) => {
        setFilteredCourts(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold">Courts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts
              .map((court) => (
                <div
                  key={court.id}
                  className="relative bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-all duration-300"
                >
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {court.name}
                      </h3>
                      <p className="text-gray-600">{court.location}</p>
                      <p className="text-yellow-500 mt-2">{court.price}</p>
                      <Link to={`/court-detail/${court.id}`}>
                        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-full w-full">
                          Xem Chi Tiết
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
  );
};

export default Court;
