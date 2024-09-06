import React, { useState } from "react";
import { Menu, Card } from "antd/lib";
import type { MenuProps } from "antd/lib";
import { FaUsers } from "react-icons/fa";
import { HiArchiveBox } from "react-icons/hi2";
import { FaBasketShopping } from "react-icons/fa6";
import { PiCoffeeBeanFill } from "react-icons/pi";
import UserTable from "@/components/Table/UserTable";
import ProductTable from "@/components/Table/ProductTable";
import OrderTable from "@/components/Table/OrderTable";
import StockTable from "@/components/Table/StockTable";
import axiosInstance from "@/utils/axiosInstance";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <FaUsers />, label: "Users" },
  { key: "2", icon: <FaBasketShopping />, label: "Orders" },
  { key: "3", icon: <PiCoffeeBeanFill />, label: "Products" },
  { key: "4", icon: <HiArchiveBox />, label: "Stock" },
];
const adminPage = () => {
  const [current, setCurrent] = useState("1");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        onClick={onClick}
        mode="horizontal"
        theme="light"
        items={items}
        style={{ width: "100%", height: "100%" }}
      />
      {current === "1" && <UserTable />}
      {current === "2" && <OrderTable />}
      {current === "3" && <ProductTable />}
      {current === "4" && <StockTable />}
    </Card>
  );
};

export default adminPage;
