import React from "react";
import { ConfigProvider, Layout } from "antd/lib";
import type { AppProps } from "next/app";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
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
