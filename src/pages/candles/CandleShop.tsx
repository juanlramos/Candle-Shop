import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import { CandlesService } from "../../shared/services/api/candles/CandlesService";

interface ICandle {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const CandleShop = () => {
  const navigate = useNavigate();
  const [candle, setCandle] = useState<ICandle[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDetail = (id: string | number) => {
    navigate(`/candle-detail/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    CandlesService.getAll()
      .then((response) => {
        setCandle(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar velas:", error);
      });
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Row justify="end" style={{ marginBottom: 24 }}>
        <Col>
          <Button
            type="primary"
            icon={<FaPlus />}
            onClick={() => {
              handleDetail("nova");
            }}
          >
            Criar
          </Button>
        </Col>
      </Row>

      {
        //gutter abaixo serve como um gap entre as colunas
      }
      <Row gutter={[24, 24]} justify="center">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Col key={i}>
                <Card loading style={{ width: 300 }} />
              </Col>
            ))
          : candle.map((candle) => (
              <Col key={candle.id}>
                <Card
                  hoverable
                  onClick={() => handleDetail(candle.id)}
                  style={{ width: 300 }}
                  size="small"
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={candle.image}
                      alt={candle.title}
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        marginBottom: 12,
                      }}
                    />
                    <h2>{candle.title}</h2>
                    <p>{candle.description}</p>
                    <h3>R$ {candle.price}</h3>
                  </div>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
};
