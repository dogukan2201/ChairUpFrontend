import React, { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { getUser, user } = useAuth();
  useEffect(() => {
    getUser();
  }, []);
  return <div className="App"></div>;
};

export default Home;
