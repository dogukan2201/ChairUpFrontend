import React from "react";
import { Row, Col, Form, Input, Button, Image } from "antd/lib";
import type { FormProps } from "antd/lib";

type LoginType = {
  username?: string;
  password?: string;
};
const onFinish: FormProps<LoginType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<LoginType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginPage = () => {
  return (
    <Row style={{ height: "100%" }} align={"middle"}>
      <Col span={12}>
        <Image src="/svg/loginImage.svg" preview={false} />
      </Col>
      <Col span={12}>
        <Image src="/svg/logo1.svg" preview={false} width={50} />
        ChairUp
        <Form
          name="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<LoginType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<LoginType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "green" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
