import { useEffect, useState } from "react";
import { Input, Pagination, Checkbox } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getCourts } from "../api/CourtAPI";




const Shop = () => {
  const [courts, setCourts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [filteredCourts, setFilteredCourts] = useState(courts);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const getUniqueLocations = (courts) => {
    const locations = courts.map((court) => court.location);
    return [...new Set(locations)];
  };

  const handleSearch = (value) => {
    const filtered = courts.filter((court) =>
      court.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCourts(filtered);
  };

  useEffect(() => {
    getCourts().then((data) => {
      setCourts(data);
      setFilteredCourts(data);
    });
  }, []);
  

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleLocationChange = (checkedValues) => {
    setSelectedLocations(checkedValues);
    filterCourts(checkedValues);
  };

  const filterCourts = (locations) => {
    let filtered = courts;

    if (locations.length > 0) {
      filtered = filtered.filter((court) =>
        locations.includes(court.location)
      );
    }

    setFilteredCourts(filtered);
  };

  const uniqueLocations = getUniqueLocations(courts);

  return (
    <div className="container mx-auto py-8">
      <div className="flex">
        <div className="flex flex-col w-1/4 p-4 bg-gray-100 rounded-lg">
          <Input
            prefix={<AiOutlineSearch className="text-gray-500" />}
            placeholder="Tìm kiếm sân..."
            onChange={(e) => handleSearch(e.target.value)}
            className="mb-4"
          />
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Vị Trí</h3>
            <Checkbox.Group
              options={uniqueLocations}
              onChange={handleLocationChange}
              className="flex flex-col"
            />
          </div>
        </div>
        <div className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold">Sân Cầu Lông</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
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

          <div className="mt-8 flex justify-center">
            <Pagination
              className="mt-8"
              current={currentPage}
              pageSize={pageSize}
              total={filteredCourts.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
