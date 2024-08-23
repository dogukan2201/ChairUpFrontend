import React from "react";
import { Row, Col, Image, Flex, Avatar, Typography, Button } from "antd/lib";
import { twoColumn } from "@/config/bootstrap";
const { Text, Title } = Typography;

import { useAuth } from "@/hooks/useAuth";
const AppHeader: React.FC = () => {
  const { user, userLogout } = useAuth();
  const fullName = user?.firstName.concat(" ", user?.lastName);

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
          {user && (
            <>
              <Avatar size={"large"} src="/svg/user.svg" />
              <Text style={{ color: "white", paddingRight: "10px" }}>
                {fullName}
              </Text>
              <Button type="primary" danger onClick={userLogout}>
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Col>
    </Row>
  );
};

export default AppHeader;
