import { Button, Card, Col, Row, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import { CandlesService } from "../../shared/services/api/candles/CandlesService";
import { CandleEdit } from "./CandleEdit";

interface ICandle {
  id: number | string;
  title: string;
  description: string;
  price: number;
  image: string;
  in_cancelado: boolean;
}

const admin = true;

export const CandleShop = () => {
  const navigate = useNavigate();
  const [candle, setCandle] = useState<ICandle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDetail = (id: string | number) => {
    navigate(`/candle-detail/${id}`);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
      {admin && (
        <Row justify="end" style={{ marginBottom: 24 }}>
          <Col>
            <Button
              type="primary"
              icon={<FaPlus />}
              onClick={handleOpenEditModal}
            >
              Criar
            </Button>
          </Col>
        </Row>
      )}

      <Modal
        open={isEditModalOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        width={800}
      >
        <CandleEdit id="nova" onClose={handleCloseEditModal} />
      </Modal>

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
          : candle
              .filter((candle) => !candle.in_cancelado)
              .map((candle) => (
                <Col key={candle.id}>
                  <Card
                    hoverable
                    onClick={() => handleDetail(candle.id)}
                    style={{ width: 300, height: 400 }}
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
                      <h3>R$ {candle.price}</h3>
                      {/*
                      Usar quando for implementado o carrinho
                      <Button
                        type="default"
                        icon={<FaCartPlus />}
                        onClick={() => navigate("#")}
                        style={{
                          marginTop: "16px",
                        }}
                      >
                        Adicionar ao carrinho
                      </Button>
                      */}
                    </div>
                  </Card>
                </Col>
              ))}
      </Row>
    </div>
  );
};
