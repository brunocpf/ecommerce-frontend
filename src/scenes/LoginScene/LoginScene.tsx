import { useAuthenticationContext } from 'features/Authentication';
import { LoginForm } from 'features/Login';
import { RegisterForm } from 'features/Register';
import ActionButton from 'components/ActionButton';
import { useRouter } from 'next/router';
import Spinner from 'components/Spinner';

export interface LoginSceneProps {}

const LoginScene: React.FC<LoginSceneProps> = () => {
  const { push } = useRouter();
  const { loggedIn, logout, userData, authenticating } =
    useAuthenticationContext();

  const handleAccount = () => {
    push('/conta');
  };

  const handleLogout = () => {
    logout().then(() => {
      push('/login');
    });
  };

  if (authenticating)
    return (
      <div className="flex items-center justify-center w-full p-40">
        <Spinner className="text-black h-40 w-40" />
      </div>
    );

  return (
    <div className="my-4 flex flex-col md:flex-row gap-4 divide-y-2 md:divide-x-2 md:divide-y-0 relative">
      {loggedIn ? (
        <div className="w-full">
          <div className="w-full flex items-center justify-center font-bold">
            <h6>Você já está logado, {userData?.firstName}.</h6>
          </div>
          <div className="flex gap-4 p-4">
            <ActionButton
              variant="primary"
              className="w-full text-lg"
              onClick={handleAccount}
            >
              Conta
            </ActionButton>
            <ActionButton
              variant="default"
              className="w-full text-lg"
              type="submit"
              onClick={handleLogout}
            >
              Sair
            </ActionButton>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <div className="w-full flex items-center justify-center font-bold">
              <h6>Já tenho cadastro</h6>
            </div>
            <LoginForm />
          </div>

          <div className="flex-1 pt-4 md:pt-0 md:pl-4">
            <div className="w-full flex items-center justify-center font-bold">
              <h6>Quero me cadastrar</h6>
            </div>
            <RegisterForm />
          </div>
        </>
      )}
    </div>
  );
};

export default LoginScene;
