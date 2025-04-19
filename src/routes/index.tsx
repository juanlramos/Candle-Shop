import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Home } from "../pages/home/Home";
import { Error } from "../pages/error/Error";
import { CandleShop } from "../pages/candles/CandleShop";
import { CandleDetail } from "../pages/candles/CandleDetail";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Error />} />
        <Route path="/candle-shop" element={<CandleShop />} />
        <Route path="/candle-detail" element={<CandleDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
