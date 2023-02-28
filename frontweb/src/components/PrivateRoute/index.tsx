import { Redirect, Route } from 'react-router-dom';
import { Role } from 'types/role';
import { hasAnyRoles, isAuthenticated } from 'util/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? ( //nao esta autenticado, redireciona pro login
          <Redirect
            to={{
              pathname: '/admin/auth/login',
              state: { from: location }, // pra ir para a localização correta de onde vc digitou na URL
            }}
          />
        ) : !hasAnyRoles(roles) ? ( //esta autenticado, mas n possui o ROLE ADMIN, ent vai para /products
          <Redirect to="/admin/products" />
        ) : (
          <>{children}</> // esta autenticado e possui o admin, mostra o filho
        )
      }
    />
  );
};

export default PrivateRoute;
