import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteCourt, getCourts } from "../api/CourtAPI";

const CourtManagement = () => {
  const [courts, setCourts] = useState([]);

  const navigate = useNavigate();

  const fetchCourts = async () => {
    getCourts()
      .then((data) => {
        console.log(data);
        setCourts(data);
      });
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete court with id: ", id);
    deleteCourt(id)
      .then((data) => {
        console.log(data);
        toast.success("Xóa sân cầu lông thành công");
        fetchCourts();
      });
  };

  return (
    <div className="bg-white p-8">
      <h2 className="text-3xl font-bold mb-6">
        Court Management
      </h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
        onClick={() => navigate("/manager/courts/new")}
      >
        Thêm sân cầu lông
      </button>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border-b border-gray-300 block md:table-row">
            <th className="py-4 px-6 text-left block md:table-cell">ID</th>
            <th className="py-4 px-6 text-left block md:table-cell">Tên sân</th>
            <th className="py-4 px-6 text-left block md:table-cell">Khu vực</th>
            <th className="py-4 px-6 text-left block md:table-cell">Số sân</th>
            <th className="py-4 px-6 text-left block md:table-cell">Giá</th>
            <th className="py-4 px-6 text-left block md:table-cell">Giờ đặt sân</th>
            <th className="py-4 px-6 text-left block md:table-cell">Hành động</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {courts.map((court) => (
            <tr key={court.id} className="border-b border-gray-300 block md:table-row">
              <td className="py-4 px-6 block md:table-cell">{court.id}</td>
              <td className="py-4 px-6 block md:table-cell">{court.name}</td>
              <td className="py-4 px-6 block md:table-cell">{court.location}</td>
              <td className="py-4 px-6 block md:table-cell">{court.courts}</td>
              <td className="py-4 px-6 block md:table-cell">{court.price}</td>
              <td className="py-4 px-6 block md:table-cell">
                <ul className="flex space-x-2 text-sm font-medium list-none">
                  {court.availableTimes.map((time) => (
                    <li key={time} className="px-3 py-1 rounded-full bg-blue-200 text-blue-800">
                      {time}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-4 px-6 block md:table-cell">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-full"
                  onClick={() => navigate(`/manager/courts/${court.id}`)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full ml-2"
                  onClick={() => handleDelete(court.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourtManagement;
