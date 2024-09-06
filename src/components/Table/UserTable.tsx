import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd/lib";
import type { TableProps } from "antd/lib";
import type { UserListType } from "@/context/AuthContext.d";

import axiosInstance from "@/utils/axiosInstance";
interface DataType {
  key: string;
  fullName: string;
  email: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<UserListType[]>([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/getAllUser");
      if (response.data && response.data.users) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const data: DataType[] = users.map((user: UserListType) => ({
    key: user._id,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
  }));

  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={data}
      virtual
      bordered={true}
      title={() => <Button>New User</Button>}
    />
  );
};

export default UserTable;
