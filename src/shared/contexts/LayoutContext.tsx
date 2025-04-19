import { createContext, useContext } from "react";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

interface ILayoutContext {}

const LayoutContext = createContext<ILayoutContext>({});

interface ILayoutProvider {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: ILayoutProvider) => {
  return (
    <LayoutContext.Provider value={{}}>
      <Layout style={{minHeight: "100vh"}}>
        <Header>Header</Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
