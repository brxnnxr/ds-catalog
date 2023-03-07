import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'util/history';
import Catalog from '..';

test('should render Catalog', async () => {
  //ARRANGE
  //ACT
  render(
    <Router history={history}>
      <Catalog />
    </Router>
  );
  //ASSERT
  expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Smart TV')).toBeInTheDocument(); //esperou o async para fazer o test
  });
});
