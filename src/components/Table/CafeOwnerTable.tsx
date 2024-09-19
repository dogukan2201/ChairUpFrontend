import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd/lib";
import type { TableProps } from "antd/lib";
import type { CafeOwnerListType } from "@/context/AuthContext.d";
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

interface CafeOwnerTableProps {
  getAllUsers: () => void;
  deleteUser: (id: string) => void;
}

const CafeOwnerTable: React.FC<CafeOwnerTableProps> = () => {
  const { cafeOwnerDelete } = useAuth();
  const [cafeOwner, setCafeOwner] = useState<CafeOwnerListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCafeOwner, setSelectedCafeOwner] = useState<DataType | null>(
    null
  );

  const showModal = (record: DataType) => {
    setSelectedCafeOwner(record);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (selectedCafeOwner) {
      await cafeOwnerDelete(selectedCafeOwner.key);
      fetchCafeOwners();
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchCafeOwners = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/admins/getAllCafeOwners", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data && response.data.cafeOwners) {
        setCafeOwner(response.data.cafeOwners);
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
  const data: DataType[] = cafeOwner.map((user: CafeOwnerListType) => ({
    key: user._id,
    fullName: `${user.firstName} ${user.lastName}`,
    phoneNumber: user.phoneNumber,
    email: user.email,
  }));

  useEffect(() => {
    fetchCafeOwners();
  }, []);

  return (
    <>
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>Are you sure you want to delete this cafe owner?</Text>
      </Modal>
      <Table
        style={{ marginTop: "20px" }}
        loading={loading}
        columns={columns}
        pagination={false}
        dataSource={data}
        virtual
        bordered
        title={() => <Text strong>Cafe Owner Table</Text>}
      />
    </>
  );
};

export default CafeOwnerTable;
