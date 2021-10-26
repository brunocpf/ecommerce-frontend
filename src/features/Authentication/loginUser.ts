import UserData from './UserData';

type LoginErrorId = 'Auth.form.error.invalid';

export class LoginError extends Error {
  constructor(public id: LoginErrorId) {
    super(id);
  }

  toString() {
    switch (this.id) {
      case 'Auth.form.error.invalid':
        return 'Usuário ou senha inválidos.';
      default:
        return 'Ocorreu um erro ao fazer login. Tente novamente.';
    }
  }
}

const loginUser = async (
  identifier: string,
  password: string,
): Promise<UserData> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });

  if (!response.ok) {
    var errorResponse = await response.json();
    throw new LoginError(errorResponse.id);
  }

  return await response.json();
};

export default loginUser;
