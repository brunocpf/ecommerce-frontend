import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import Spinner from 'components/Spinner';
import ActionButton from 'components/ActionButton';
import TextInput from 'components/TextInput/TextInput';
import { useAuthenticationContext } from 'features/Authentication';
import { useRouter } from 'next/router';

type LoginFormValues = {
  email: string;
  password: string;
};

export interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { login } = useAuthenticationContext();
  const { push, query } = useRouter();

  const onSubmit = (values: LoginFormValues) => {
    setLoading(true);
    login(values.email, values.password)
      .then(() => {
        setLoading(false);
        setError(undefined);
        const { redirect } = query;

        if (typeof redirect === 'string') {
          push(redirect);
        }
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* workaround to disable lastName autofill */}
      <input
        id="username"
        className="hidden"
        type="text"
        name="fakeusernameremembered"
      />

      <fieldset className="flex flex-col gap-3" disabled={loading}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <TextInput
            error={!!errors.email}
            {...register('email', {
              required: 'Preencha o email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Email inválido',
              },
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="email"
            as="div"
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <TextInput
            type="password"
            error={!!errors.password}
            {...register('password', {
              required: 'Preencha a senha',
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="password"
            as="div"
            errors={errors}
          />
        </div>

        <div className="w-full p-10 flex flex-col items-center justify-center">
          {loading ? (
            <Spinner className="w-20 h-20" />
          ) : (
            <>
              {error && (
                <div>
                  <span className="text-lg text-red-500">{`${error}`}</span>
                </div>
              )}

              <ActionButton
                variant="primary"
                className="w-full text-lg"
                type="submit"
              >
                Entrar
              </ActionButton>
            </>
          )}
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
