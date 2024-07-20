import { Menu, Input } from "antd";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMapPin, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import bad3Image from "../assets/images/bad3.png";

const { SubMenu } = Menu;

const Header = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setRole(localStorage.getItem("role"));
    if(localStorage.getItem("role") === "manager"){
      window.location.href = "/manager/courts";
    }
  }, []);
  return (
    <header className="relative text-white">

      <div className="sticky top-0 bg-white z-20">
        <div className="container mx-auto p-4 flex justify-between items-center relative">
          <div className="relative w-44 h-20">
            <Link to="/">
              <img
                src={bad3Image}
                alt="Logo"
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "0",
                  zIndex: "20",
                }}
              />
            </Link>
          </div>
          <Menu mode="horizontal" className="bg-white flex-1 ml-36">
            <Menu.Item key="home">
              <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="shop">
              <a href="/shop">Shop</a>
            </Menu.Item>
          </Menu>
          <div className="flex items-center space-x-4">
          {email ? (
              <div className="flex items-center space-x-4">
                  <span className="text-black">{email}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("role");
                    setEmail("");
                    setRole("");
                  }}
                  className="bg-red-400 text-white px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-400 text-white px-4 py-2 rounded-full"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
