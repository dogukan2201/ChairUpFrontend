import React, { useEffect } from "react";
import { Row, Col, Image, Flex, Avatar, Typography, Button } from "antd/lib";
import { twoColumn } from "@/config/bootstrap";
const { Text, Title } = Typography;
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "@/hooks/useAuth";
const AppHeader: React.FC = () => {
  const { user, userLogout, getAdmin } = useAuth();
  const fullName = user?.firstName.concat(" ", user?.lastName);
  const userRole = user?.role;

  return (
    <Row>
      <Col {...twoColumn}>
        <Flex style={{ paddingLeft: "10px" }} justify="start" align="center">
          <Image src="/svg/logo3.svg" preview={false} width={40} />
          <Title style={{ color: "white", marginBottom: "0px" }} level={2}>
            ChairUp
          </Title>
        </Flex>
      </Col>

      <Col {...twoColumn}>
        <Flex
          style={{ height: "100%", paddingRight: "10px" }}
          justify="end"
          align="center"
        >
          {user ? (
            <>
              <Avatar size={"large"} src="/svg/user.svg" />
              <Text style={{ color: "white", paddingRight: "10px" }}>
                {`User:${fullName}`}
                <br />
                {`Role: ${userRole}`}
              </Text>
              <Button type="primary" danger onClick={userLogout}>
                Logout
                <IoMdLogOut size={20} />
              </Button>
              <Button href="/admin">Admin Panel</Button>
            </>
          ) : (
            <>
              <Button href="/login/admin">Admin Login</Button>
              <Button href="/login/customer">Customer Login</Button>
              <Button href="/admin">Admin Panel</Button>
            </>
          )}
        </Flex>
      </Col>
    </Row>
  );
};

export default AppHeader;
