import axios from "axios";
import { getUsersByEmail } from "./UserAPI";

const api = "http://localhost:9990/orders";

export const getOrders = async () => {
    try{
        const response = await axios.get(api);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const createOrder = async (order) => {
    try{
        const orders = await getOrders();
        order.id = (orders.length + 1).toString();
        order.status = "pending";
        console.log(order)
        const response = await axios.post(api, order);
        return response.data;
    }catch(error){
        throw error;
    }
}
export const approveOrder = async (order) => {
    try{
        order.status = 'Approved';
        const response = await axios.put(`${api}/${order.id}`, order);
        return response.data;
    }catch(error){
        throw error;
    }
}
export const rejectOrder = async (order) => {
    try{
        order.status = 'Rejected';
        const response = await axios.put(`${api}/${order.id}`, order);
        return response.data;
    }catch(error){
        throw error;
    }
}