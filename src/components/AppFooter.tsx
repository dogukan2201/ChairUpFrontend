import React from "react";
import { Row, Col, Image, Flex, Typography } from "antd/lib";
import { twoColumn } from "@/config/bootstrap";
const { Text } = Typography;
const AppFooter: React.FC = () => {
  return (
    <Row>
      <Col {...twoColumn}>
        <Flex style={{ height: "%100" }}>
          <Image src="/svg/logo2.svg" preview={false} width={30} />
          <Text> ChairUp Footer</Text>
        </Flex>
      </Col>
      <Col {...twoColumn}>
        <Flex justify="end" style={{ height: "%100" }}>
          <Text>EGG Solutions</Text>
        </Flex>
      </Col>
    </Row>
  );
};

export default AppFooter;
