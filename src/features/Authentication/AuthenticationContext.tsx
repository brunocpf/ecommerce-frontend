import { gql, useQuery } from '@apollo/client';
import { MeQuery } from 'api';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import loginUser from './loginUser';
import logoutUser from './logoutUser';
import registerUser from './registerUser';
import RegisterUserData from './RegisterUserData';
import UserData from './UserData';

type AuthenticationContextType = {
  loggedIn: boolean;
  userData: UserData | null;
  register: (data: RegisterUserData, captchaCode: string) => Promise<void>;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authenticating: boolean;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  loggedIn: false,
  userData: null,
  authenticating: false,
});

const ME_QUERY = gql`
  query MeQuery {
    me {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

  const login = useCallback(async (identifier: string, password: string) => {
    const data = await loginUser(identifier, password);
    setUserData(data);
  }, []);

  const register = useCallback(
    async (registerData: RegisterUserData, captchaCode: string) => {
      const data = await registerUser(registerData, captchaCode);
      setUserData(data);
    },
    [],
  );

  const logout = useCallback(async () => {
    await logoutUser();
    setUserData(null);
  }, []);

  useEffect(() => {
    if (data && !error) {
      setUserData(data.me?.user ?? null);
    } else if (error) {
      logout();
    }
  }, [data, error, logout]);

  return (
    <AuthenticationContext.Provider
      value={{
        loggedIn: userData != null,
        userData,
        register,
        login,
        logout,
        authenticating: loading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
