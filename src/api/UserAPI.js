import axios from "axios";

const api = "http://localhost:9990/users";

//login
export const login = async (user) => {
    try{
        console.log(user)
        const response = await axios.get(api);
        const users = response.data;
        const found = users.find(u => u.email == user.email && u.password == user.password);
        console.log(found);
        console.log(users);
        if(found){
            return found;
        }
        throw new Error("Not Correct email or Password");
    }catch(error){
        throw error;
    }
}

//register
export const register = async (user) => {
    try{
      const response = await axios.get(api);
      const users = response.data;
      const found = users.find(u => u.email == user.email && u.password == user.password);
      if(found){
          throw new Error("Email Already Exists");
      }

      user.id = (users.length + 2).toString();
      const res = await axios.post(api, {
        ...user,
        role: "guest"
      });
      return res.data;
    }catch(error){
        throw error;
    }
}

//getUsers
export const getUsers = async () => {
    try{
        const response = await axios.get(api);
        return response.data;
    }catch(error){
        throw error;
    }
}
export const getUsersByEmail = async (email) => {
    try{
        const response = await axios.get(`${api}?email=${email}`);
        return response.data.id;
    }catch(error){
        throw error;
    }
}

export const getUserNameByID = (id) => {
    try{
        const response = axios.get(`${api}?id=${id}`);
    return response.data.name;
    }catch(error){
        throw error;
    }
}