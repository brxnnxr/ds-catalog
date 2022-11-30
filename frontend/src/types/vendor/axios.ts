import { Method } from "axios";

export type AxiosParams = {
  method?: Method; //get, post, delete, push
  url: string;
  data?: object;
  params?: object;
};
