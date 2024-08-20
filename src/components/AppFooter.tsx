import React from "react";
import { Row, Col, Image } from "antd/lib";
import Link from "antd/lib/typography/Link";

const AppFooter: React.FC = () => {
  return (
    <Row>
      <Col span={8}>
        <Image src="/svg/logo2.svg" preview={false} width={30} />
        ChairUp Footer
      </Col>
      <Col span={8}></Col>
      <Col span={8}></Col>
    </Row>
  );
};

export default AppFooter;
