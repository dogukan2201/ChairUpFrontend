import React, { useEffect } from "react";
import Card from "antd/lib/card/Card";
import { useAuth } from "@/hooks/useAuth";
const Home = () => {
  const { getCustomer } = useAuth();
  useEffect(() => {
    getCustomer();
  }, []);

  return <Card style={{ height: "100%" }}>Welcome To Chair Up</Card>;
};

export default Home;
