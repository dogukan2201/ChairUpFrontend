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
import { useAuth } from "@/hooks/useAuth";

const { Title } = Typography;
type LoginType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { userLogin, loading } = useAuth();

  const onSubmit: FormProps<LoginType>["onFinish"] = async (values) => {
    try {
      await userLogin(values.email, values.password);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onFinishFailed: FormProps<LoginType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

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
            <Title
              level={2}
              style={{
                borderRadius: "15px",
                width: "100%",
                color: "green",
                textAlign: "center",
              }}
            >
              Login
              <span
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "7px",
                }}
              >
                ChairUp
              </span>
            </Title>
          </Flex>

          <Form
            layout="vertical"
            name="loginForm"
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            style={{ width: "50%" }}
          >
            <Form.Item<LoginType>
              label="Email"
              name="email"
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
                  loading={loading}
                >
                  Login
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
