import { Card } from "antd";
import { useEffect, useState } from "react";

import { CandlesService } from "../../shared/services/api/candles/CandlesService";

interface ICandle {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const CandleShop = () => {
  const [candle, setCandle] = useState<ICandle[]>([]);

  useEffect(() => {
    CandlesService.getAll()
    .then((response) => {
      setCandle(response);
    })
    .catch((error) => {
      console.error("Error ao buscar velas:", error);
    })
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Candle Shop</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            maxWidth: 1000,
          }}
        >
          {candle.map((candle) => (
            <Card key={candle.id} style={{ width: 300, margin: 16 }}>
              <img src={candle.image} alt={candle.title} />
              <h3>{candle.title}</h3>
              <p>{candle.description}</p>
              <p>${candle.price}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
