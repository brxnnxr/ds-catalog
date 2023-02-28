import { Role } from 'types/role';
import { getTokenData } from './token';


export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false; //pra ver se o token não esta expirado (exp = expirar)
}; //função pra ver se o usuario ta autenticado

export const hasAnyRoles = (roles: Role[]): boolean => { //função pra ver se o usuario possui algum desses roles
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    for (var i = 0; i < roles.length; i++) { // percorrer os roles
      if (tokenData.authorities.includes(roles[i])) { //verificar se na lista tokenData, em autorities existe algum role na posição i
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role));
  }

  return false;
};