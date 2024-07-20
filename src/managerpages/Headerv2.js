import { Input, Dropdown, Menu, Button } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Search } = Input;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#profile">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#settings">Settings</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <a href="/login" onClick={
        () => {
          localStorage.removeItem("email");
          localStorage.removeItem("role");
        }
      }>Logout</a>
    </Menu.Item>
  </Menu>
);

const Headerv2 = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setRole(localStorage.getItem("role"));
    if(localStorage.getItem("role") !== "manager"){
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="flex justify-end items-center p-4 bg-white shadow-md h-24 w-full sticky right-0">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          className="ant-dropdown-link flex items-center"
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined style={{ fontSize: "20px", marginRight: "8px" }} />
          <span>{email}</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default Headerv2;
