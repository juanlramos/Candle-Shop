import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  UploadFile,
  message,
} from "antd";
import { FaPlus } from "react-icons/fa6";
import { NumericFormat } from "react-number-format";

import { CandlesService } from "../../shared/services/api/candles/CandlesService";

interface ICandleEditProps {
  id: string | number;
  onClose: () => void;
}

export const CandleEdit = ({ id, onClose }: ICandleEditProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [priceValue, setPriceValue] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const dataToSave = {
        ...values,
        price: priceValue ?? 0,
        image: fileList[0]?.url || "",
      };

      if (id === "nova") {
        await CandlesService.create(dataToSave);
      } else {
        await CandlesService.update(id, dataToSave);
      }

      messageApi
        .open({
          type: "success",
          content: "Vela salva com sucesso!",
          duration: 1.5,
        })
        .then(() => {
          onClose();
        });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      messageApi.open({
        type: "error",
        content: "Erro ao salvar!",
      });
    }
  };

  useEffect(() => {
    if (id !== "nova") {
      CandlesService.getById(id)
        .then((response) => {
          form.setFieldsValue(response);
          if (response.image) {
            setFileList([
              {
                uid: "-1",
                name: "imagem.png",
                status: "done",
                url: response.image,
              },
            ]);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar velas:", error);
        });
    } else {
      form.resetFields();
    }
  }, []);

  return (
    <>
      {contextHolder}
      {id === "nova" ? (
        <Col
          style={{
            textAlign: "center",
          }}
        >
          <h1>Novo Produto</h1>
          <Form layout="vertical">
            <Form.Item label="Imagem">
              <Upload listType="picture-card" maxCount={1}>
                <FaPlus />
              </Upload>
            </Form.Item>
            <Form.Item name="title" label="Titulo">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Descricao">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Preco">
              <Input type="number" prefix="R$" />
            </Form.Item>
          </Form>
          <Row>
            <Col span={12}>
              <Button type="primary">Salvar</Button>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={onClose}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Col>
      ) : (
        <Col
          style={{
            textAlign: "center",
          }}
        >
          <h1>Editar Cadastro</h1>
          <Form layout="vertical" form={form}>
            <Form.Item label="Imagem">
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
              >
                {fileList.length < 1 && <FaPlus />}
              </Upload>
            </Form.Item>
            <Form.Item name="title" label="Titulo">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Descricao">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Preço">
              <NumericFormat
                customInput={Input}
                prefix="R$"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPriceValue(floatValue ?? null);
                }}
              />
            </Form.Item>
          </Form>
          <Row>
            <Col span={12}>
              <Button type="primary" onClick={handleSave}>
                Salvar
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={onClose}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};
