import React, { useContext } from "react";
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
import { useAuth } from "@/context/AuthContext";

const { Title } = Typography;

type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const { userSignUp, user, loading } = useAuth();

  const onSubmit: FormProps<SignUpType>["onFinish"] = async (values) => {
    try {
      await userSignUp(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onFinishFailed: FormProps<SignUpType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ height: "100%" }} align={"middle"}>
      <Col {...twoColumn} xs={0} sm={0}>
        <Flex justify="center" align="center">
          <Image src="/svg/sign.svg" preview={false} width={600} />
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
            <Title level={2}>ChairUp SignUp</Title>
          </Flex>

          <Form
            layout="vertical"
            name="loginForm"
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            style={{ width: "50%" }}
          >
            <Form.Item<SignUpType>
              label="First Name:"
              name="firstName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<SignUpType>
              label="Last Name:"
              name="lastName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<SignUpType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<SignUpType>
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
                  loading={loading}
                >
                  Sign Up
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};

export default SignUpPage;
