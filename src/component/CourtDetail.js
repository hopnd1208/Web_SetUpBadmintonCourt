  import { useEffect, useState } from "react";
  import { Link, Navigate, useParams } from "react-router-dom";
  import { Form,Button } from "react-bootstrap";
  import {Select, DatePicker, Input, Rate } from "antd";
  import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
  import moment from "moment";
  import { getCourts } from "../api/CourtAPI";
  import { createOrder } from "../api/OrderAPI";
  import { toast } from "react-toastify";

  const { Option } = Select;

  const time = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
  ];

  const CourtDetail = () => {
    const { id } = useParams();
    const [court, setCourt] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(0);

    const [order, setOrder] = useState({
      id: "",
      courtId: id,
      date: "",
      time: [],
      userId: "",

    })

    const getWeekDates = (weekOffset = 0) => {
      const now = new Date();
      const startOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay() + 1 + 7 * weekOffset)
      );
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
      });
    };

    useEffect(() => {
      getCourts().then((data) => {
        const court = data.find((court) => court.id == id);
        setCourt(court);
      });
    }, [id]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setOrder({
        ...order,
        [name]: value
      });
    };
    const handleTimeChange = (name, value) => {
      setOrder((prevOrder) => ({
        ...prevOrder,
        [name]: value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      createOrder(order)
        .then((response) => {
          console.log(response);
          toast.success("Yêu cầu đã được gửi");
          setOrder({ date: '', time: [], userId: '' });
        })
        .catch((error) => {
          
        });
    };


    const weekDates = getWeekDates(currentWeek);

    if (!court) {
      return <div>Sân không tìm thấy</div>;
    }

    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <img
              src={court.image}
              alt={court.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold">{court.name}</h1>
            <p className="text-gray-600">{court.location}</p>
            <p className="text-gray-600">Số lượng sân: {court.courts}</p>
            <Rate disabled defaultValue={5} />
            <p className="text-lg font-semibold">Giá: {court.price}</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Giờ hoạt động</h3>
              <ul>
                {court.availableTimes.map((time, index) => (
                  <li key={index} className="text-gray-600">{time}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="my-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Court ID</Form.Label>
              <Form.Control
                type="text"
                name="courtId"
                value={id}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={order.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Label>Time</Form.Label>
            <Select
                mode="multiple"
                placeholder="Chọn giờ"
                name="time"
                className="w-full mb-2"
                value={order.time}
                onChange={(value) => handleTimeChange("time", value)}
              >
                {time.map((slot) => (
                  <Option key={slot} value={slot}>
                    {slot}
                  </Option>
                ))}
              </Select>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="number"
                name="userId"
                value={order.userId}
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Đặt</Button>
          </Form>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Đặt sân theo khung thời gian
          </h2>
          <div className="flex justify-between items-center mb-4">
            <Button
              icon={<ArrowLeftOutlined />}
              className="bg-gray-200"
              onClick={() => setCurrentWeek((prev) => prev - 1)}
            >
              Tuần trước
            </Button>
            <Button
              icon={<ArrowRightOutlined />}
              className="bg-gray-200"
              onClick={() => setCurrentWeek((prev) => prev + 1)}
            >
              Tuần sau
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDates.map((date, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">{moment(date).format("L")}</h3>
                <div className="mt-2">
                  {time.map((slot) => (
                    <div key={slot} className="bg-gray-200 p-2 rounded mb-2">
                      {slot} - 120k
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default CourtDetail;
