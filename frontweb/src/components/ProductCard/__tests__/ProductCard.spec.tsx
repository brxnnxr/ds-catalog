  import { render, screen } from '@testing-library/react';
  import { Product } from 'types/product';
  import ProductCard from '..';

  test('shold render ProductCard', () => {
    //ARRANGE
    const product: Product = {
      name: 'Computador',
      price: 2345.67,
      imgUrl: 'htps://google.com',
    } as Product;

    //ACT
    render(<ProductCard product={product} />);

    //ASSERT
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('2.345,67')).toBeInTheDocument();
  });
