import React, { useEffect, useState } from "react";
import { Menu, Card } from "antd/lib";
import type { MenuProps } from "antd/lib";
import { FaUsers } from "react-icons/fa";
import { HiArchiveBox } from "react-icons/hi2";
import { FaBasketShopping } from "react-icons/fa6";
import { PiCoffeeBeanFill } from "react-icons/pi";
import CustomerTable from "@/components/Table/CustomerTable";
import EmployeeTable from "@/components/Table/EmployeeTable";
import CafeOwnerTable from "@/components/Table/CafeOwnerTable";
import StockTable from "@/components/Table/StockTable";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <FaUsers />, label: "Customers" },
  { key: "2", icon: <FaBasketShopping />, label: "Cafe Owners" },
  { key: "3", icon: <PiCoffeeBeanFill />, label: "Employees" },
  { key: "4", icon: <HiArchiveBox />, label: "Stock" },
];
const AdminPage: React.FC = () => {
  const [current, setCurrent] = useState("1");
  const router = useRouter();
  const { getAdmin, role } = useAuth();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/login/admin");
    } else {
      getAdmin();
    }
  }, [router]);
  useEffect(() => {
    if (localStorage.getItem("role") !== "Admin") {
      router.push("/login/admin");
    }
  }, []);

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Menu
        defaultSelectedKeys={["1"]}
        selectedKeys={[current]}
        onClick={onClick}
        mode="horizontal"
        theme="light"
        items={items}
        style={{ width: "100%", height: "100%" }}
      />
      {current === "1" && <CustomerTable />}
      {current === "2" && <CafeOwnerTable />}
      {current === "3" && <EmployeeTable />}
      {current === "4" && <StockTable />}
    </Card>
  );
};

export default AdminPage;
