import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useRef, useState } from 'react';
import Spinner from 'components/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';
import TextInput from 'components/TextInput/TextInput';
import ActionButton from 'components/ActionButton';
import { useAuthenticationContext } from 'features/Authentication';

type RegisterFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<RegisterFormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { register: registerUser } = useAuthenticationContext();
  const captchaRef = useRef<any>();

  const password = useRef('');
  password.current = watch('password', '');

  const onSubmit = () => {
    captchaRef.current.execute();
  };

  const onCaptchaChange = (captchaCode?: string | null) => {
    if (!captchaCode) {
      return;
    }

    const { email, firstName, lastName, password } = getValues();

    setLoading(true);
    registerUser({ email, firstName, lastName, password }, captchaCode)
      .then(() => {
        setLoading(false);
        setError(undefined);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    captchaRef.current.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-3" disabled={loading}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email*</label>
          <TextInput
            error={!!errors.email}
            type="email"
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

        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="firstName">Nome*</label>
            <TextInput
              error={!!errors.firstName}
              {...register('firstName', {
                required: 'Preencha o nome',
              })}
            />
            <ErrorMessage
              className="text-xs text-red-500"
              name="firstName"
              as="div"
              errors={errors}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="lastName">Sobrenome*</label>
            <TextInput
              error={!!errors.lastName}
              {...register('lastName', {
                required: 'Preencha o sobrenome',
              })}
            />
            <ErrorMessage
              className="text-xs text-red-500"
              name="lastName"
              as="div"
              errors={errors}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha*</label>
          <TextInput
            error={!!errors.password}
            type="password"
            {...register('password', {
              required: 'Preencha a senha',
              minLength: {
                message: 'Mínimo de 6 dígitos',
                value: 6,
              },
              maxLength: {
                message: 'Máximo de 32 dígitos',
                value: 32,
              },
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="password"
            as="div"
            errors={errors}
            render={({ message, messages }) => {
              if (!messages) {
                if (message)
                  return (
                    <span className="text-xs text-red-500">{message}</span>
                  );
              } else {
                return Object.entries(messages).map(([type, message]) => (
                  <span className="text-xs text-red-500" key={type}>
                    {message}
                  </span>
                ));
              }
              return null;
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirmar a senha*</label>
          <TextInput
            error={!!errors.confirmPassword}
            type="password"
            autoComplete="off"
            {...register('confirmPassword', {
              required: 'Preencha a senha',
              minLength: {
                message: 'Mínimo de 6 dígitos',
                value: 6,
              },
              maxLength: {
                message: 'Máximo de 32 dígitos',
                value: 32,
              },
              validate: value =>
                value === password.current || 'As senhas não batem',
            })}
          />
          <ErrorMessage
            className="text-xs text-red-500"
            name="confirmPassword"
            as="div"
            errors={errors}
            render={({ message, messages }) => {
              if (!messages) {
                if (message)
                  return (
                    <span className="text-xs text-red-500">{message}</span>
                  );
              } else {
                return Object.entries(messages).map(([type, message]) => (
                  <span className="text-xs text-red-500" key={type}>
                    {message}
                  </span>
                ));
              }
              return null;
            }}
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
        </div>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
