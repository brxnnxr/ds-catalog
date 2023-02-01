import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Products = () => {
  return (
    <h1>
      <Switch>
        <Route path="/admin/products" exact>
          <List />
        </Route>
        <Route path="/admin/products/:productId">
          <Form />
        </Route>
      </Switch>
    </h1>
  );
};

export default Products;
