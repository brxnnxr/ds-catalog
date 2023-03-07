import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '..';

describe('Pagination tests', () => {
  test('should render pagination ', () => {
    //ARRANGE
    const pageCount = 3;
    const range = 3;
    //ACT
    render(<Pagination pageCount={pageCount} range={range} />);
    //ASSERT
    const page1 = screen.getByText('1');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3');
    const page4 = screen.queryByText('4');

    expect(page1).toBeInTheDocument();
    expect(page1).toHaveClass('pagination-link-active'); //para testar o css

    expect(page2).toBeInTheDocument();
    expect(page2).not.toHaveClass('pagination-link-active'); //para testar o css

    expect(page3).toBeInTheDocument();
    expect(page3).not.toHaveClass('pagination-link-active'); //para testar o css

    expect(page4).not.toBeInTheDocument(); //queryBy não lança erro, so retorna nulo qnd n encontrar
  });
});

describe('Pagination tests', () => {
  test('next arrow should call onChange ', () => {
    //ARRANGE
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn(); //para simular um objeto
    //ACT
    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );
    //ASSERT

    const arrowNext = screen.getByTestId('arrow-next');

    userEvent.click(arrowNext); //para simular o evento de click
    expect(onChange).toHaveBeenCalledWith(1); //para passar 1x para frente e chamar o proximo obj
  });

  test('previous arrow should call onChange ', () => {
    //ARRANGE
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn(); //para simular um objeto
    const forcePage = 1; //forçar para estar na pagina 1
    //ACT
    render(
      <Pagination
        pageCount={pageCount}
        range={range}
        onChange={onChange}
        forcePage={forcePage}
      />
    );
    //ASSERT

    const arrowPrevious = screen.getByTestId('arrow-previous');

    userEvent.click(arrowPrevious); //para simular o evento de click
    expect(onChange).toHaveBeenCalledWith(0);
  });

  test('page link should call onChange ', () => {
    //ARRANGE
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn(); //para simular um objeto
    //ACT
    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );
    //ASSERT

    const page2 = screen.getByText('2');

    userEvent.click(page2); //para simular o evento de click
    expect(onChange).toHaveBeenCalledWith(1); //para passar 1x para frente e chamar o proximo obj
  });
});
