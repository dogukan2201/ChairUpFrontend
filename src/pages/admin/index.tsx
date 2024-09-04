import React, { useState } from "react";
import { Button, Menu, Card } from "antd/lib";
import type { MenuProps } from "antd/lib";
import { FiAlignJustify } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { HiArchiveBox } from "react-icons/hi2";
import { FaBasketShopping } from "react-icons/fa6";
import { PiCoffeeBeanFill } from "react-icons/pi";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <FaUsers />, label: "Users" },
  { key: "2", icon: <FaBasketShopping />, label: "Orders" },
  { key: "3", icon: <PiCoffeeBeanFill />, label: "Products" },
  { key: "4", icon: <HiArchiveBox />, label: "Stock" },
];
const adminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Card style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, color: "white", backgroundColor: "green" }}
      >
        {collapsed ? <FiAlignJustify /> : <FiAlignJustify />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </Card>
  );
};

export default adminPage;
