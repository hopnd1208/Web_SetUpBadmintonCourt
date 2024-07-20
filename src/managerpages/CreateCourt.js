import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createCourt } from '../api/CourtAPI';
import { useNavigate } from 'react-router-dom';

const CreateCourt = () => {
  const [court, setCourt] = useState({
    name: '',
    location: '',
    courts: 0,
    price: '',
    image: '',
    availableTimes: []
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};

    if (!court.name) errors.name = 'Name is required';
    if (!court.location) errors.location = 'Location is required';
    if (!court.courts || court.courts <= 0) errors.courts = 'Number of courts must be greater than 0';
    if (!court.price) errors.price = 'Price is required';
    if (!court.image) errors.image = 'Image URL is required';
    if (court.availableTimes.length === 0 || court.availableTimes.some(time => !time)) errors.availableTimes = 'At least one available time is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourt({
      ...court,
      [name]: value
    });
  };

  const handleAvailableTimesChange = (e, index) => {
    const newAvailableTimes = [...court.availableTimes];
    newAvailableTimes[index] = e.target.value;
    setCourt({
      ...court,
      availableTimes: newAvailableTimes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    createCourt(court)
      .then((response) => {
        console.log(response);
        toast.success("Thêm sân cầu lông thành công");
        // navigate
        navigate('/manager/courts');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteTime = (index) => {
    const newAvailableTimes = court.availableTimes.filter((_, i) => i != index);
    setCourt({
      ...court,
      availableTimes: newAvailableTimes
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Đăng ký sân cầu lông</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Tên sân</label>
          <input
            type="text"
            name="name"
            value={court.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${errors.name ? 'border-red-500' : 'focus:border-blue-500'}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Vị trí</label>
          <input
            type="text"
            name="location"
            value={court.location}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${errors.location ? 'border-red-500' : 'focus:border-blue-500'}`}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Số lượng sân</label>
          <input
            type="number"
            name="courts"
            value={court.courts}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${errors.courts ? 'border-red-500' : 'focus:border-blue-500'}`}
          />
          {errors.courts && <p className="text-red-500 text-sm">{errors.courts}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Giá cả</label>
          <input
            type="text"
            name="price"
            value={court.price}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${errors.price ? 'border-red-500' : 'focus:border-blue-500'}`}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Link ảnh</label>
          <input
            type="text"
            name="image"
            value={court.image}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${errors.image ? 'border-red-500' : 'focus:border-blue-500'}`}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>
        <div className="col-span-1 md:col-span-2 mb-4">
          <label className="block text-lg font-medium mb-2">Thời gian sân hoạt động</label>
          {court.availableTimes.map((time, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={time}
                onChange={(e) => handleAvailableTimesChange(e, index)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${errors.availableTimes ? 'border-red-500' : 'focus:border-blue-500'}`}
              />
              <button
                type="button"
                onClick={() => handleDeleteTime(index)}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Xóa
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setCourt({ ...court, availableTimes: [...court.availableTimes, ''] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Thêm giờ
          </button>
          {errors.availableTimes && <p className="text-red-500 text-sm">{errors.availableTimes}</p>}
        </div>
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Tạo sân
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourt;
