import { Api } from "../axios-config";

interface ICandle{
    "id": number;
    "title": string;
    "description": string;
    "price": number;
    "image": string;
}

const CandlesService = {
    getAll: async () => {
        const { data } = await Api.get<ICandle[]>("/candles");
        return data;
    }
}

export { CandlesService };