import { ErrorMessage } from '@hookform/error-message';
import ActionButton from 'components/ActionButton';
import Spinner from 'components/Spinner';
import TextInput from 'components/TextInput/TextInput';
import { useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';

type CartCheckoutFormValues = {
  logradouro: string;
  numero: number;
  complemento?: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export interface CartCheckoutProps {}

async function fetchCEP(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

async function validateCEP(cep: string) {
  try {
    const cepData = await fetchCEP(cep);
    if (cepData == null || cepData.erro) return 'CEP inválido.';

    return true;
  } catch {
    return 'CEP inválido.';
  }
}

const CartCheckout: React.FC<CartCheckoutProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<CartCheckoutFormValues>();

  const loading = false;
  const onSubmit = () => {};

  const { onBlur: onBlurCep, ...registerCep } = register('cep', {
    required: 'Preencha o CEP',
    validate: async value =>
      new Promise(resolve => {
        debounce(
          async value => {
            resolve(validateCEP(value));
          },
          600,
          { leading: true },
        )(value);
      }),
  });

  const populateCepFields = async () => {
    if (errors.cep) return;
    const { cep } = getValues();

    const cepData = await fetchCEP(cep);

    console.log(cepData);

    if (cepData == null || cepData.erro) return;

    setValue('logradouro', cepData.logradouro);

    setValue('bairro', cepData.bairro);

    setValue('cidade', cepData.localidade);

    setValue('estado', cepData.uf);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-3" disabled={loading}>
        <div className="flex flex-col gap-1">
          <label htmlFor="logradouro">Logradouro*</label>
          <TextInput
            error={!!errors.logradouro}
            {...register('logradouro', {
              required: 'Preencha o logradouro',
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="logradouro"
            as="div"
            errors={errors}
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="lastName">Complemento</label>
          <TextInput
            error={!!errors.complemento}
            {...register('complemento')}
          />
        </div>

        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="cep">CEP*</label>
            <TextInput
              error={!!errors.cep}
              {...registerCep}
              onBlur={e => {
                onBlurCep(e);
                populateCepFields();
              }}
            />
            <ErrorMessage
              className="text-xs text-red-500"
              name="cep"
              as="div"
              errors={errors}
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="firstName">Número*</label>
            <TextInput
              error={!!errors.numero}
              {...register('numero', {
                required: 'Preencha o número',
              })}
            />
            <ErrorMessage
              className="text-xs text-red-500"
              name="numero"
              as="div"
              errors={errors}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bairro">Bairro*</label>
          <TextInput
            error={!!errors.bairro}
            {...register('bairro', {
              required: 'Preencha o bairro',
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="bairro"
            as="div"
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cep">Cidade*</label>
          <TextInput
            error={!!errors.cidade}
            {...register('cidade', {
              required: 'Preencha o CEP',
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="cidade"
            as="div"
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cep">Estado (UF)*</label>
          <TextInput
            error={!!errors.cidade}
            {...register('estado', {
              required: 'Preencha o CEP',
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="estado"
            as="div"
            errors={errors}
          />
        </div>

        <button type="submit">Comprar</button>

        {/* <div className="w-full p-10 flex flex-col items-center justify-center">
          {loading ? (
            <Spinner className="w-20 h-20" />
          ) : (
            <>
              {error && (
                <div>
                  <span className="text-lg text-red-500">{`${error}`}</span>
                </div>
              )}

              <ReCAPTCHA
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
                ref={captchaRef}
                onChange={onCaptchaChange}
              />

              <ActionButton
                variant="secondary"
                className="w-full text-lg"
                type="submit"
              >
                Cadastrar
              </ActionButton>
            </>
          )}
        </div> */}
      </fieldset>
    </form>
  );
};

export default CartCheckout;
