import { createContext, useContext } from "react";
import { Button, Layout, Menu, Typography } from "antd";
import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  //FaCartPlus,
  FaUser,
} from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const { Link, Title } = Typography;

interface ILayoutContext {}

const LayoutContext = createContext<ILayoutContext>({});

interface ILayoutProvider {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: ILayoutProvider) => {
  const location = useLocation();
  const getActiveKey = () => {
    const path = location.pathname;
    if (path.includes("shop")) return "shop";
    if (path.includes("about")) return "about";
    if (path.includes("home")) return "home";
    return "";
  };

  return (
    <LayoutContext.Provider value={{}}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <Title
            level={4}
            style={{
              margin: 0,
              paddingLeft: 24,
            }}
          >
            <a href="/">Candle Shop</a>
          </Title>

          <Menu
            mode="horizontal"
            selectedKeys={[getActiveKey()]}
            style={{
              justifyContent: "center",
              flex: 1,
              borderBottom: "none",
              background: "transparent",
            }}
          >
            <Menu.Item key={"home"}>
              <Link href="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key={"shop"}>
              <Link href="/candle-shop">Shop</Link>
            </Menu.Item>
            <Menu.Item key={"about"}>
              <Link href="/about">About Us</Link>
            </Menu.Item>
          </Menu>

          <div
            style={{
              marginLeft: "auto",
              width: 100,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {
              //ultilizar quando for implementado fluxo de usuario e carrinho de compras
              <Button
                type="text"
                icon={<FaUser size={20} />}
                size="large"
                shape="circle"
                href="#"
              /> /*
            <Button
              type="text"
              icon={<FaCartPlus size={20} />}
              size="large"
              shape="circle"
              href="#"
            />
            */
            }
          </div>
        </Header>

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
