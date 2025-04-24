import { AxiosError } from "axios";

export const ErrorInterceptor = (error: AxiosError) => {
  if (error.code === "Network Error") {
    return Promise.reject(new Error("Erro de conexão"));
  }

  if (error.response?.status === 401) {
    return Promise.reject(new Error("Nao autorizado"));
  }

  return Promise.reject(error);
};
