import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd/lib";
import type { TableProps } from "antd/lib";
import type { CustomerListType } from "@/context/AuthContext.d";
import axiosInstance from "@/utils/axiosInstance";
import { TiDelete } from "react-icons/ti";
import { Typography } from "antd/lib";
import { useAuth } from "@/hooks/useAuth";
const { Text } = Typography;

interface DataType {
  key: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface CustomerTableProps {
  getAllUsers: () => void;
  deleteUser: (id: string) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = () => {
  const { customerDelete } = useAuth();
  const [customers, setCustomers] = useState<CustomerListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<DataType | null>(
    null
  );

  const showModal = (record: DataType) => {
    setSelectedCustomer(record);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (selectedCustomer) {
      await customerDelete(selectedCustomer.key);
      fetchCustomers();
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/admins/allCustomers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data && response.data.customers) {
        setCustomers(response.data.customers);
      }
    } catch (error) {
      console.error("Error fetching users", error);
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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
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
  const data: DataType[] = customers.map((user: CustomerListType) => ({
    key: user._id,
    fullName: `${user.firstName} ${user.lastName}`,
    phoneNumber: user.phoneNumber,
    email: user.email,
  }));

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>Are you sure you want to delete this customer?</Text>
      </Modal>
      <Table
        style={{ marginTop: "20px" }}
        loading={loading}
        columns={columns}
        pagination={false}
        dataSource={data}
        virtual
        bordered
        title={() => <Text strong>Customer Table</Text>}
      />
    </>
  );
};

export default CustomerTable;
