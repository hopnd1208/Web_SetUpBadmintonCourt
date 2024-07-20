import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { approveOrder, rejectOrder, getOrders } from "../api/OrderAPI";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [userNames, setUserNames] = useState({});

  const fetchOrders = async () => {
    getOrders()
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleApprove = (id) => {
    console.log("Approve order with id: ", id);
    approveOrder(id)
      .then((data) => {
        console.log(data);
        fetchOrders();
      });
  };
  const handleReject = (order) => {
    console.log("Reject order with id: ", order.id);
    rejectOrder(order)
      .then((data) => {
        console.log(data);
        toast.success("Từ chối order thành công");
        fetchOrders();
      });
  };
  return (
    <div className="bg-white p-8">
      <h2 className="text-3xl font-bold mb-6">
        Order Management
      </h2>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border-b border-gray-300 block md:table-row">
            <th className="py-4 px-6 text-left block md:table-cell">ID</th>
            <th className="py-4 px-6 text-left block md:table-cell">Tên sân</th>
            <th className="py-4 px-6 text-left block md:table-cell">Ngày</th>
            <th className="py-4 px-6 text-left block md:table-cell">Khung giờ</th>
            <th className="py-4 px-6 text-left block md:table-cell">Khách hàng</th>
            <th className="py-4 px-6 text-left block md:table-cell">Trạng thái</th>
            <th className="py-4 px-6 text-left block md:table-cell">Hành động</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-300 block md:table-row">
              <td className="py-4 px-6 block md:table-cell">{order.id}</td>
              <td className="py-4 px-6 block md:table-cell">{order.courtId}</td>
              <td className="py-4 px-6 block md:table-cell">{order.date}</td>
              <td className="py-4 px-6 block md:table-cell">
                <ul className="flex space-x-2 text-sm font-medium list-none">
                  {order.time.map((time, index) => (
                    <li key={index} className="px-3 py-1 rounded-full bg-blue-200 text-blue-800">
                      {time}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-4 px-6 block md:table-cell">
                {order.id}
              </td>
              <td className="py-4 px-6 block md:table-cell">{order.status}</td>
              <td className="py-4 px-6 block md:table-cell">
                {order.status === 'pending' && (
                <div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-full"
                    onClick={() => handleApprove(order)}
                  >
                    Chấp nhận
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full"
                    onClick={() => handleReject(order)}
                  >
                    Từ chối
                  </button>
                </div>
              )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;