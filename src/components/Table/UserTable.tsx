import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd/lib";
import type { TableProps } from "antd/lib";
import type { UserListType } from "@/context/AuthContext.d";
import axiosInstance from "@/utils/axiosInstance";
import { TiDelete } from "react-icons/ti";
import { Typography } from "antd/lib";
const { Text, Title } = Typography;
import { FaUsers } from "react-icons/fa6";

interface DataType {
  key: string;
  fullName: string;
  email: string;
  role: string;
}

interface UserTableProps {
  getAllUsers: () => void;
  deleteUser: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ getAllUsers }) => {
  const [users, setUsers] = useState<UserListType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/getAllUser");
      if (response.data && response.data.users) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserHandler = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/deleteUser/${id}`);
      if (response.data.message === "User Deleted") {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user", error);
    } finally {
      setLoading(false);
    }
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <Text>{text}</Text>,
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text>{text}</Text>,
      width: 200,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 90,
      key: "role",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Action",
      key: "action",
      width: 100,

      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => deleteUserHandler(record.key)}>
            <TiDelete size={25} />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = users.map((user: UserListType) => ({
    key: user._id,
    fullName: `${user.firstName} ${user.lastName}`,
    role: user.role,
    email: user.email,
  }));
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Table
      style={{ marginTop: "20px" }}
      loading={loading}
      columns={columns}
      pagination={false}
      dataSource={data}
      virtual
      bordered
      title={() => <Text strong>Users Table</Text>}
    />
  );
};

export default UserTable;
