import React from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Layout } from "antd";
import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
const { Header, Content, Footer } = Layout;

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider>
    <Layout style={{ height: "100vh" }}>
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  </ConfigProvider>
);

export default App;
