import React from "react";
import { Space, Table, Button } from "antd/lib";
import type { TableProps } from "antd/lib";

interface DataType {
  key: string;
  product: string;
  amount: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Products",
    dataIndex: "product",
    key: "product",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    product: "Filter Coffee",
    amount: "10kg",
  },
  {
    key: "2",
    product: "Americano",
    amount: "20kg",
  },
  {
    key: "3",
    product: "Latte",
    amount: "5kg",
  },
  {
    key: "4",
    product: "Chair",
    amount: "50",
  },
];

const StockTable: React.FC = () => {
  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={data}
      virtual
      bordered={true}
      title={() => <Button>Add Product</Button>}
    />
  );
};

export default StockTable;
