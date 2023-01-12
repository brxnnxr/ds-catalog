import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs'; //biblioteca para fazer a conversao de objeto para query string
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080'; //process.env para pegar as variaveis de ambiente. Se a variavel nao estiver definida, pega a variavel da direita
  
  const basicHeader = () => "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET) 
//contatenou o login e senha para gerar o valor do cabeçalho

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader()
  };

  const data = qs.stringify({ ///para gerar  o urlencoded a esse objeto
    ...loginData,
    grant_type: 'password',
  }); 

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers; // pega as configurações antigas e concatena com a authorization

  return axios({ ...config, baseURL: BASE_URL, headers }); //a função recebe as configuraçães do axios e retorna repassando pro axios  
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //
    return config;
  },
  function (error) {
    //
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    //
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      history.push('/admin/auth');
    }
    return Promise.reject(error);
  }
);