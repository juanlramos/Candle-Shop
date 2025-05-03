import { Api } from "../axios-config";

interface ICandle{
    "id": number | string;
    "title": string;
    "description": string;
    "price": number;
    "image": string;
    "in_cancelado": boolean
}

const CandlesService = {
    getAll: async () => {
        const { data } = await Api.get<ICandle[]>("/candles");
        return data;
    },

    getById: async (id : number | string) => {
        const { data } = await Api.get<ICandle>(`/candles/${id}`);
        return data;
    },

    create: async (data: ICandle) => {
        const { data: candle } = await Api.post<ICandle>("/candles", data);
        return candle;
    },

    update: async (id: number | string, data: ICandle) => {
        const { data: candle } = await Api.put<ICandle>(`/candles/${id}`, data);
        return candle;
    },

    delete: async (id: number | string) => {
        await Api.delete(`/candles/${id}`);
    },
}

export { CandlesService };