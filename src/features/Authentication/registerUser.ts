import RegisterUserData from './RegisterUserData';
import UserData from './UserData';

type RegisterErrorId = 'Auth.form.error.email.taken';

export class RegisterError extends Error {
  constructor(public id: RegisterErrorId) {
    super(id);
  }

  toString() {
    switch (this.id) {
      case 'Auth.form.error.email.taken':
        return 'Email já cadastrado.';
      default:
        return 'Ocorreu um erro ao cadastrar o usuário. Tente novamente.';
    }
  }
}

const registerUser = async (
  userData: RegisterUserData,
  captchaCode: string,
): Promise<UserData> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ ...userData, captchaCode }),
  });

  if (!response.ok) {
    var errorResponse = await response.json();
    throw new RegisterError(errorResponse.id);
  }

  return await response.json();
};

export default registerUser;
