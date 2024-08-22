import React from "react";
import { Row, Col, Image, Flex, Avatar, Typography } from "antd/lib";
import { twoColumn, oneColumn, threeColumn } from "@/config/bootstrap";
const { Text, Title } = Typography;

import { useAuth } from "@/context/AuthContext";
const AppHeader: React.FC = () => {
  const { user } = useAuth();
  const fullName = user?.firstName.concat(" ", user?.lastName);

  return (
    <Row>
      <Col {...twoColumn}>
        <Flex style={{ paddingLeft: "10px" }} justify="start" align="center">
          <Image src="/svg/logo3.svg" preview={false} width={50} />
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
              <Text style={{ color: "white" }}>{fullName}</Text>
            </>
          )}
        </Flex>
      </Col>
    </Row>
  );
};

export default AppHeader;
