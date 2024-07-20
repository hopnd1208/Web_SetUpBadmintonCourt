import axios from "axios";

const api = "http://localhost:9990/courts";

export const getCourts = async () => {
    try{
        const response = await axios.get(api);
        return response.data;
    }catch(error){
        throw error;
    }
}
//getCourtById
export const getCourtById = async (id) => {
    try{
        const response = await axios.get(`${api}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}
//Create
export const createCourt = async (court) => {
    try{
        var courts = await getCourts();
        court.id = (courts.length + 2).toString();
        console.log(court)
        const response = await axios.post(api, court);
        return response.data;
    }catch(error){
        throw error;
    }
}

//Update
export const updateCourt = async (id, court) => {
    try{
        const response = await axios.put(`${api}/${id}`, court);
        return response.data;
    }catch(error){
        throw error;
    }
}

//Delete
export const deleteCourt = async (id) => {
    try{
        const response = await axios.delete(`${api}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}