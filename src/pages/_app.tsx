import React from "react";
import { ConfigProvider, Layout } from "antd/lib";
import type { AppProps } from "next/app";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
const { Header, Content, Footer } = Layout;
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider>
    <AuthProvider>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ backgroundColor: "green", padding: 0, margin: 0 }}>
          <AppHeader />
        </Header>
        <Content style={{ overflow: "scroll" }}>
          <Component {...pageProps} />
        </Content>
        <Footer style={{ backgroundColor: "green" }}>
          <AppFooter />
        </Footer>
      </Layout>
    </AuthProvider>
  </ConfigProvider>
);

export default App;
