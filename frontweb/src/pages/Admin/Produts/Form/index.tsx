import './styles.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form action="">
          <div className="row">
            <div className="col-lg-6">
              <input type="text" className="base-input form-control" />
              <input type="text" className="base-input form-control" />
              <input type="text" className="base-input form-control" />
            </div>
            <div className="col-lg-6">
              <textarea name="" rows={10} className="base-input form-control">
                {' '}
              </textarea>
            </div>
          </div>
          <div className="">
            <button className="btn-outline-danger">CANCELAR</button>
            <button className="btn-outline-primary">SALVAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
