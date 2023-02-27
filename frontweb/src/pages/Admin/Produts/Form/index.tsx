import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

import './styles.css';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const history = useHistory();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        setValue('name', response.data.name);
        setValue('price', response.data.price);
        setValue('description', response.data.description);
        setValue('imgUrl', response.data.imgUrl);
        setValue('categories', response.data.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      price: String(formData.price).replace(',', '.'),
    }; //quando der submit, vai pegar o formdata, e substituir as ',' por '.'
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/productsbtfe',
      data: data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Produto cadastrado com sucesso!');
        history.push('/admin/products');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar o produto!');
      });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />

                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <Controller
                  name="categories"
                  rules={{ required: 'true' }} //obrigatorio
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) =>
                        String(category.id)
                      }
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

              <div className="margin-bottom-30">
                <Controller //para formatar o preço, deixar so number e colocar as so 2 decimais apos o ., usando a biblioteca CurrencyInnput
                  name="price"
                  rules={{ required: 'Campo obrigatório' }}
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      placeholder="Preço"
                      className={`form-control base-input ${
                        errors.price ? 'is-invalid' : ''
                      }`}
                      disableGroupSeparators={true} //para desabilitar o ponto do milhar
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />

                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'Deve ser uma URL valida',
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="URL da imagem do produto"
                  name="imgUrl"
                />

                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              onClick={handleCancel}
              className="btn-outline-danger bg-white product-crud-button"
            >
              CANCELAR
            </button>
            <button className="btn-primary product-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
