import React from "react";
import { Row, Col, Image } from "antd/lib";

const AppHeader: React.FC = () => {
  return (
    <Row>
      <Col span={12}>
        <Image src="/svg/logo3.svg" preview={false} width={50} />
        ChairUp
      </Col>
      <Col span={12}>col-6</Col>
    </Row>
  );
};

export default AppHeader;
