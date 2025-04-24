import Axios from "axios";

import { environment } from "../../../environments";
import { ResponseInterceptor, ErrorInterceptor } from "./interceptors";

const Api = Axios.create({
  baseURL: environment.baseUrl,
});

Api.interceptors.response.use(
  (response) => ResponseInterceptor(response),
  (error) => ErrorInterceptor(error)
);

export { Api };
