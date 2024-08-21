import React from "react";
import { ConfigProvider, Layout } from "antd/lib";
import type { AppProps } from "next/app";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
const { Header, Content, Footer } = Layout;
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider>
    <Layout style={{ height: "100vh" }}>
      <Header style={{ backgroundColor: "green", padding: 0, margin: "0px" }}>
        <AppHeader />
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer style={{ backgroundColor: "green" }}>
        <AppFooter />
      </Footer>
    </Layout>
  </ConfigProvider>
);

export default App;
