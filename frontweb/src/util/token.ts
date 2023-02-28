import jwtDecode from 'jwt-decode'; //biblioteca para decodificar pra gerar um onj do tipo TokenData
import { Role } from "types/role";
import { getAuthData } from "./storage";

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => { //ou vai retornar TokenData ou undefined
  try {
    return jwtDecode(getAuthData().access_token) as TokenData; // esta esperando o type TokenData
  } catch (error) {
    return undefined;
  }
};