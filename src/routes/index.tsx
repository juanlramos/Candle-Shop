import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";

import { Home } from "../pages/home/Home";
import { Error } from "../pages/error/Error";
import { CandleShop } from "../pages/candles/CandleShop";
import { CandleDetail } from "../pages/candles/CandleDetail";
import { LayoutProvider } from "../shared/contexts/LayoutContext";
import { LightTheme } from "../shared/themes";
import { AboutUs } from "../pages/aboutUs/AboutUs";

export const AppRoutes = () => {
  return (
    <ConfigProvider theme={LightTheme}>
      <BrowserRouter>
        <LayoutProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Error />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/candle-shop" element={<CandleShop />} />
            <Route path="/candle-detail" element={<CandleDetail />} />
          </Routes>
        </LayoutProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
};
