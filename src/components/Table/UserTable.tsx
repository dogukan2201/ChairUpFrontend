import React from "react";
import { Space, Table, Button } from "antd/lib";
import type { TableProps } from "antd/lib";

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

const data: DataType[] = [
  {
    key: "1",
    fullName: "John Brown",
    email: "john@gmail.com",
  },
  {
    key: "2",
    fullName: "Jim Green",
    email: "jim@gmail.com",
  },
  {
    key: "3",
    fullName: "Joe Black",
    email: "joe@gmail.com",
  },
];

const UserTable: React.FC = () => {
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
