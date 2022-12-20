import axios from "axios";
import qs from "qs" //biblioteca para fazer a conversao de objeto para query string

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080'; 
//process.env para pegar as variaveis de ambiente. Se a variavel nao estiver definida, pega a variavel da direita


const CLIENT_ID= process.env.REACT_APP_CLIENT_ID ?? "dscatalog";
const CLIENT_SECRET= process.env.REACT_APP_CLIENT_SECRET ?? "dscatalog123";

const basicHeader = () => "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) 
//contatenou o login e senha para gerar o valor do cabeçalho

type LoginData = {
  username: string;
  password: string;
}

export const requestBackendLogin = (loginData : LoginData) => { //para fazer requisição para o backendv 
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: basicHeader()
  }

  const data = qs.stringify({ //para gerar  o urlencoded a esse objeto
    ...loginData,
    grant_type : 'password'
  });

  return axios({method: 'POST', baseURL: BASE_URL, url: "/oauth/token", data, headers})
}