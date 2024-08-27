import React, { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { user, getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);
  return <div className="App"></div>;
};

export default Home;
