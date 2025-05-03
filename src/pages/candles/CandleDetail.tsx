import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Modal,
  Image,
  Skeleton,
  Popconfirm,
  message,
} from "antd";
import { FaArrowLeftLong, FaPencil, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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

export const CandleDetail = () => {
  const { id = "nova" } = useParams<"id">();
  const [titulo, setTitulo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [candleData, setCandleData] = useState<Omit<ICandle, "id">>({
    title: "",
    description: "",
    price: 0,
    image: "",
    in_cancelado: false,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await CandlesService.update(id, {
        ...candleData,
        id,
        in_cancelado: true,
      });

      messageApi
        .open({
          type: "success",
          content: "Vela deletada com sucesso!",
          duration: 1.5,
        })
        .then(() => {
          navigate("/candle-shop");
        });
    } catch (error) {
      console.error("Erro ao deletar:", error);
      messageApi.open({
        type: "error",
        content: "Erro ao deletar!",
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (id !== "nova") {
      CandlesService.getById(id)
        .then((response) => {
          setIsLoading(false);
          console.log(response);
          setTitulo(response.title);
          setCandleData(response);
        })
        .catch((error) => {
          console.error("Erro ao buscar velas:", error);
        });
    } else {
      setTitulo("Nova Vela");
      setCandleData({
        title: "",
        description: "",
        price: 0,
        image: "",
        in_cancelado: false,
      });
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <>
          <Row style={{ padding: 20 }}>
            <Col
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Skeleton.Button active />
            </Col>
          </Row>

          <Row style={{ minHeight: "100vh" }}>
            <Col
              span={15}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Skeleton.Image
                active
                style={{
                  width: 600,
                  height: 600,
                  borderRadius: 15,
                }}
              />
            </Col>
            <Col
              span={9}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "24px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h1>{titulo}</h1>
              <h1>
                R${" "}
                {candleData.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
              <p>{candleData.description}</p>
              <Row justify="space-around">
                <>
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row style={{ padding: 20 }}>
            <Col
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Button
                type="text"
                icon={<FaArrowLeftLong />}
                onClick={() => window.history.back()}
              >
                Voltar
              </Button>
            </Col>
          </Row>

          <Row style={{ minHeight: "100vh" }}>
            <Modal
              open={isEditModalOpen}
              onCancel={handleCloseEditModal}
              footer={null}
              width={800}
            >
              <CandleEdit id={id} onClose={handleCloseEditModal}/>
            </Modal>

            <Col
              span={15}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                width={600}
                height={600}
                src={candleData.image}
                alt={candleData.title}
                style={{
                  objectFit: "cover",
                  borderRadius: 15,
                }}
              />
            </Col>
            <Col
              span={9}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "24px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h1>{titulo}</h1>
              <h1>
                R${" "}
                {candleData.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
              <p>{candleData.description}</p>
              <Row justify="space-around">
                {admin && (
                  <>
                    <Button
                      type="text"
                      icon={<FaPencil />}
                      onClick={handleOpenEditModal}
                      style={{
                        marginTop: "16px",
                      }}
                    >
                      Editar
                    </Button>

                    <Popconfirm
                      title="Tem certeza que deseja excluir este produto?"
                      description="Essa ação excluirá o produto."
                      okText="Sim"
                      cancelText="Não"
                      onConfirm={handleDelete}
                    >
                      <Button
                        type="text"
                        danger
                        icon={<FaTrash />}
                        style={{ marginTop: "16px" }}
                      >
                        Excluir
                      </Button>
                    </Popconfirm>
                  </>
                )}
              </Row>
              {/*
                <Row justify="space-around">
                  <Button
                    type="text"
                    icon={<FaCartPlus />}
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    Adicionar ao carrinho
                  </Button>
                  <Button
                    type="text"
                    icon={<FaShare />}
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    Compartilhar
                  </Button>
                </Row>
              */}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
