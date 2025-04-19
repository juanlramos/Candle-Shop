import { createContext, useContext } from "react";
import { Button, Layout, Typography } from "antd";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

const { Header, Content, Footer } = Layout;

const Link = Typography.Link;

interface ILayoutContext {}

const LayoutContext = createContext<ILayoutContext>({});

interface ILayoutProvider {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: ILayoutProvider) => {
  return (
    <LayoutContext.Provider value={{}}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>Header</Header>
        <Content>{children}</Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <p>
            <b>Candle Shop</b>
          </p>
          <p>
            <Button
              type="text"
              icon={<FaInstagram />}
              size="large"
              shape="circle"
              target="_blank"
              href="https://www.instagram.com/velas_candle_shop/"
            />
            <Button
              type="text"
              icon={<FaFacebook />}
              size="large"
              shape="circle"
              target="_blank"
              href="https://www.facebook.com/velas.candle.shop"
            />
            <Button
              type="text"
              icon={<FaXTwitter />}
              size="large"
              shape="circle"
              target="_blank"
              href="https://twitter.com/"
            />
          </p>
          <p>
            &copy; 2025
            {new Date().getFullYear() == 2025 ? "" : -new Date().getFullYear()}
          </p>
          <p>
            Website Criated by{" "}
            <Link href="https://github.com/juanlramos" target="_blank">
              Juan Lucas
            </Link>
          </p>
        </Footer>
      </Layout>
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
