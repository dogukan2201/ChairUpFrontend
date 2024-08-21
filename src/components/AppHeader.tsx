import React from "react";
import { Row, Col, Image, Flex, Avatar, Typography } from "antd/lib";
import { twoColumn, oneColumn, threeColumn } from "@/config/bootstrap";
const { Text, Link, Title } = Typography;

const AppHeader: React.FC = () => {
  //for user conditional rendering
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
          <Avatar size={"large"} src="/svg/user.svg" />
          <Text style={{ color: "white" }}>Username</Text>
        </Flex>
      </Col>
    </Row>
  );
};

export default AppHeader;
