import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Image,
  Flex,
  Typography,
} from "antd/lib";
import type { FormProps } from "antd/lib";
import { twoColumn } from "@/config/bootstrap";
import { Divider } from "antd";
const { Text, Title } = Typography;
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
      <Col {...twoColumn} xs={0} sm={0}>
        <Flex justify="center" align="center">
          <Image src="/svg/loginImage3.svg" preview={false} width={600} />
        </Flex>
      </Col>
      <Col {...twoColumn} xs={24} sm={24}>
        <Flex vertical align="center">
          <Flex
            justify="center"
            align="center"
            style={{ paddingBottom: "20px" }}
          >
            <Image src="/svg/logo1.svg" preview={false} width={60} />
            <Title level={2}>ChairUp Login</Title>
          </Flex>

          <Form
            layout="vertical"
            name="loginForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "60%" }}
          >
            <Form.Item<LoginType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<LoginType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Flex justify="center">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "green" }}
                  block
                >
                  Submit
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};

export default LoginPage;
