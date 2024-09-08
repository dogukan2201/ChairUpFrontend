import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd/lib";
import type { TableProps } from "antd/lib";
import type { UserListType } from "@/context/AuthContext.d";
import axiosInstance from "@/utils/axiosInstance";
import { TiDelete } from "react-icons/ti";
import { Typography } from "antd/lib";
const { Text } = Typography;

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

const UserTable: React.FC<UserTableProps> = () => {
  const [users, setUsers] = useState<UserListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const showModal = (record: DataType) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedUser) {
      deleteUserHandler(selectedUser.key);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/users/all");
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
      const response = await axiosInstance.delete(
        `/api/users/deleteUser/${id}`
      );
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text>{text}</Text>,
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
          <Button danger onClick={() => showModal(record)}>
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
    <>
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>Are you sure you want to delete this user?</Text>
      </Modal>
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
    </>
  );
};

export default UserTable;
