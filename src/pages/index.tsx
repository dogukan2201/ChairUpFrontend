import React, { useEffect } from "react";
import Card from "antd/lib/card/Card";
import { useAuth } from "@/hooks/useAuth";
import GoogleMaps from "@/components/GoogleMap";
const Home = () => {
  const { getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Card style={{ height: "100%" }}>
      <GoogleMaps />
    </Card>
  );
};

export default Home;
