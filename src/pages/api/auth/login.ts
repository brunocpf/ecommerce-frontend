import { NextApiHandler } from 'next';
import { setCookie } from 'nookies';
import apolloClient from 'util/apolloClient';
import { ApolloError, gql } from '@apollo/client';
import { LoginUser, LoginUserVariables } from 'api';

const LOGIN_MUTATION = gql`
  mutation LoginUser($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        user {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

const login: NextApiHandler = async (req, res) => {
  const { password, identifier } = JSON.parse(req.body);

  try {
    const response = await apolloClient.mutate<LoginUser, LoginUserVariables>({
      mutation: LOGIN_MUTATION,
      variables: { identifier, password },
    });

    setCookie({ res }, 'jwt', response.data?.login.jwt ?? '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: process.env.NODE_ENV !== 'development' ? 'None' : undefined,
    });

    res.status(200).send({
      ...response.data?.login.user.user,
    });
  } catch (e: any) {
    if (e instanceof ApolloError) {
      res.status(400).send(
        e.graphQLErrors[0].extensions?.exception.data.data[0].messages[0] ?? {
          id: 'Unknown',
          message: 'Unknown error',
        },
      );
      return;
    }

    res.status(400).send({
      id: 'Unknown',
      message: 'Unknown error',
    });
  }
};

export default login;
