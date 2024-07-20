import { useState } from "react";
import { Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { register } from "../api/UserAPI";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const newUser = { name, email, password };
      console.log("Attempting signup with:", newUser); // Debugging log
      const response = await register(newUser);
      console.log("Signup response:", response); // Debugging log

      message.success("Signup successful!");
      // Điều hướng hoặc thực hiện các hành động khác sau khi đăng ký thành công
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response || error.message); // Debugging log
      message.error(error.response || error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-8">Sign up</h1>
        <Input
          placeholder="Name"
          prefix={<UserOutlined />}
          className="mb-4 w-1/3 rounded-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          prefix={<MailOutlined />}
          className="mb-4 w-1/3 rounded-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          className="mb-4 w-1/3 rounded-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-400 text-white w-1/3 h-8 rounded-full"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
      <div className="flex-1 bg-gradient-to-r from-yellow-500 to-green-400 text-white flex flex-col justify-center items-center relative rounded-es-full">
        <div className="flex flex-col items-center absolute top-20 right-20 text-right">
          <h1 className="text-4xl font-bold mb-4">One of us?</h1>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <Link
            to="/login"
            className="bg-white text-green-400 px-4 py-2 rounded-full flex items-center justify-center"
          >
            Sign in
          </Link>
        </div>
        <img
          src="src/assets/images/bad4-modified.png"
          alt="Badminton Player"
          className="absolute bottom-0 right-50 w-1/2"
        />
      </div>
    </div>
  );
};

export default Signup;
